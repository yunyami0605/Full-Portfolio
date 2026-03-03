"use client";

import styles from "./CommentInput.module.scss";
import {
  CommentItemType,
  SelectedCommentItemType,
  useGetCommentsApi,
  useGetRecommentsApi,
  usePatchCommentApi,
  usePostCommentApi,
} from "../..";
import { isAxiosError } from "axios";
import { useUiStore } from "@/shared/stores/ui.store";
import { useGetAuthInfo } from "@/features/auth/_hooks/query";
import { startTransition } from "react";

type Props = {
  selectedCommentItem?: SelectedCommentItemType;

  comment: string;
  onChange: (value: string) => void;
  postId: string;
  onInitSelectedComment: () => void;
  onAddOptimistic?: (comment: CommentItemType) => void;
};

/**
 *@description 댓글 입력
 */
export function CommentInput({
  selectedCommentItem,
  comment,
  onChange,
  postId,
  onInitSelectedComment,
  onAddOptimistic,
}: Props) {
  const { showToast } = useUiStore();
  const { data: authData } = useGetAuthInfo();
  const { mutateAsync: mutateCreate, isPending: isPendingCreate } = usePostCommentApi(postId);
  const { mutateAsync: mutateUpdate, isPending: isPendingUpdate } = usePatchCommentApi(
    selectedCommentItem?.id,
  );

  const { refetch: refetchComments } = useGetCommentsApi(postId, 10, false);
  const { refetch: refetchRecomments } = useGetRecommentsApi(
    selectedCommentItem?.parentId ?? "",
    10,
    false,
  );

  // 댓글 등록/수정/답글 입력에 대한 엔트리 포인트
  const onSubmitComment = () => {
    if (isPendingCreate || isPendingUpdate) return;

    if (comment.length === 0) {
      showToast({ message: "댓글을 입력해주세요.", type: "error" });
      return;
    }

    if (comment.length > 200) {
      showToast({ message: "댓글은 최대 200자까지 입력가능합니다.", type: "error" });
      return;
    }

    // 수정 모드일 때는 기존 방식으로 처리
    if (selectedCommentItem?.action === "update") {
      mutateUpdate({ content: comment })
        .then((res) => {
          if (res.status === 200) {
            if (selectedCommentItem.type === "comment") {
              refetchComments();
            } else {
              refetchRecomments();
            }

            showToast({
              message: `${selectedCommentItem.type === "comment" ? "댓글" : "답글"}이 수정되었습니다.`,
              type: "success",
            });
            onInitSelectedComment();
            onChange("");
          }
        })
        .catch((error) => {
          if (isAxiosError(error)) {
            showToast({ message: error.message ?? "", type: "error" });
          }
        });
      return;
    }

    // 댓글 등록 / 답글 등록 (최상위 댓글만 낙관적 UI 적용)
    const isTopLevelComment = !selectedCommentItem || selectedCommentItem?.type === "comment";

    // 실제 등록 요청과 낙관적 업데이트를 함께 처리
    const runCreate = async () => {
      if (isTopLevelComment && onAddOptimistic && authData?.data) {
        const optimisticComment: CommentItemType = {
          id: `optimistic-${Date.now()}`,
          postId,
          content: comment,
          author: {
            id: authData.data.id,
            nickname: authData.data.nickname,
            imageUrl: null,
          },
          likeCount: 0,
          recommentCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        onAddOptimistic(optimisticComment);
      }

      try {
        const res = await mutateCreate({
          content: comment,
          parentId: selectedCommentItem?.parentId ?? null,
          targetId: selectedCommentItem?.targetId ?? null,
        });

        if (res.status === 201) {
          if (selectedCommentItem?.type === "recomment") {
            await refetchRecomments();
          } else {
            await refetchComments();
          }

          showToast({
            message:
              selectedCommentItem?.type === "comment" || isTopLevelComment
                ? "댓글이 등록되었습니다."
                : "답글이 등록되었습니다.",
            type: "success",
          });
          onInitSelectedComment();
          onChange("");
        }
      } catch (error) {
        if (isAxiosError(error)) {
          showToast({ message: error.message ?? "", type: "error" });
        }
      }
    };

    startTransition(() => {
      runCreate();
    });
  };

  return (
    <div className={styles.comment_input}>
      {selectedCommentItem?.action === "create" && selectedCommentItem?.type === "recomment" && (
        <div className={styles.recomment_target}>
          <p className={styles.target_text}>
            <span className={styles.target_nickname}>
              @ {selectedCommentItem?.targetNickname ?? ""}
            </span>
            님에게 답글 작성중입니다.
          </p>

          <button onClick={onInitSelectedComment}>취소</button>
        </div>
      )}

      <div className={styles.input_wrapper}>
        <input
          id="comment"
          type="text"
          value={comment}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`${selectedCommentItem?.type === "recomment" ? "답글" : "댓글"}을 ${selectedCommentItem?.action === "create" ? "수정" : "입력"}하세요...`}
          onKeyDown={(e) => e.key === "Enter" && onSubmitComment()}
        />

        <button data-testid="comment-submit" onClick={onSubmitComment}>
          {selectedCommentItem?.action === "update" ? "수정" : "등록"}
        </button>
      </div>
    </div>
  );
}
