"use client";

import styles from "./CommentInput.module.scss";
import {
  SelectedCommentItemType,
  useGetCommentsApi,
  useGetRecommentsApi,
  usePatchCommentApi,
  usePostCommentApi,
} from "../..";
import { isAxiosError } from "axios";
import { useUiStore } from "@/shared/stores/ui.store";
type Props = {
  selectedCommentItem?: SelectedCommentItemType;

  comment: string;
  onChange: (value: string) => void;
  postId: string;
  onInitSelectedComment: () => void;
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
}: Props) {
  const { showToast, showLoading } = useUiStore();
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

  // 댓글 등록/수정/답글
  const onSubmitComment = async () => {
    if (isPendingCreate || isPendingUpdate) return;
    // if (isPendingCreate || isPendingUpdate || isPendingDelete) return;

    if (comment.length === 0) {
      showToast({ message: "댓글을 입력해주세요.", type: "error" });
      return;
    }

    if (comment.length > 200) {
      showToast({ message: "댓글은 최대 200자까지 입력가능합니다.", type: "error" });
      return;
    }

    try {
      if (selectedCommentItem?.action === "update") {
        // # 댓글 수정
        const res = await mutateUpdate({
          content: comment,
        });
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
      } else {
        // # 댓글 등록 / 답글 등록
        const res = await mutateCreate({
          content: comment,
          parentId: selectedCommentItem?.parentId ?? null,
          targetId: selectedCommentItem?.targetId ?? null,
        });

        if (res.status === 201) {
          if (selectedCommentItem?.type === "recomment") {
            refetchRecomments();
          } else {
            refetchComments();
          }

          showToast({
            message:
              selectedCommentItem?.type === "comment"
                ? "댓글이 등록되었습니다."
                : "답글이 등록되었습니다.",
            type: "success",
          });
          onInitSelectedComment();
          onChange("");
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showToast({ message: error.message ?? "", type: "error" });
      }
    }
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

        <button onClick={onSubmitComment}>
          {selectedCommentItem?.action === "update" ? "수정" : "등록"}
        </button>
      </div>
    </div>
  );
}
