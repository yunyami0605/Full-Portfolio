"use client";

import styles from "./CommentItem.module.scss";
import { useUserId } from "@/features/user/_hooks/useUserId";
import { Column, Row } from "@my/ui";
import { AuthorInfoView } from "@/shared/components/views/AuthorInfoView";
import {
  CommentItemType,
  SelectedCommentItemType,
  useDeleteCommentApi,
  useGetCommentsApi,
  useGetRecommentsApi,
} from "../..";
import { useState } from "react";
import clsx from "clsx";

type Props = {
  data: CommentItemType;
  isRecomment?: boolean;
  onSelectComment: (selectedComment: SelectedCommentItemType) => void;
  onChange: (value: string) => void;
  isActionsViewShow?: boolean;
};

/**
 *@description 댓글 항목
 *@param onReply 응답 이벤트
 *@param onDelete 삭제 이벤트
 */
export function CommentItem({
  data,
  isRecomment,
  onSelectComment,
  onChange,
  isActionsViewShow = true,
}: Props) {
  const userId = useUserId();

  // 삭제 / 댓글 목록조회 / 답글 목록 조회 훅
  const { mutateAsync: mutateDelete } = useDeleteCommentApi(data.id);
  const { refetch: refetchComments } = useGetCommentsApi(data.postId, 10, false);
  const { refetch: refetchRecomments } = useGetRecommentsApi(data.parentId ?? "", 10, false);

  const [isRecommentsShow, setRecommentsShow] = useState(false);

  const {
    data: recommentsData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetRecommentsApi(data.id, 10, isRecommentsShow);

  // 답글 목록
  const recommentsList = (recommentsData?.pages ?? []).flatMap((page) => page.data.items);

  // 답글 더보기
  const onShowRecomments = () => {
    if (!isRecommentsShow) {
      setRecommentsShow((prev) => !prev);
    } else {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  // 답글 달기
  const onReply = () => {
    onSelectComment({
      type: "recomment",
      action: "create",
      id: null,
      parentId: isRecomment ? data.parentId : data.id,
      targetId: data.id,
      targetNickname: data.author.nickname,
    });
  };

  // 댓글/답글 수정
  const onEdit = () => {
    onChange(data.content);

    onSelectComment({
      type: isRecomment ? "recomment" : "comment",
      action: "update",
      id: data.id,
      targetId: null,
      parentId: isRecomment ? data.parentId : null,
      targetNickname: null,
    });
  };

  // 댓글/답글 삭제
  const onDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      mutateDelete().then((response) => {
        if (response.status === 200) {
          if (isRecomment) {
            refetchRecomments();
          } else {
            refetchComments();
          }
        }
      });
    }
  };

  return (
    <Column
      className={clsx(styles.comment_container, !isRecomment && styles.parent_comment_container)}
    >
      {/* 프로필 아이콘 */}
      <Column className={styles.comment_wrapper}>
        <Row className={styles.author_info_view}>
          <AuthorInfoView
            authorImage={data.author?.imageUrl}
            authorName={data.author?.nickname ?? ""}
            date={data.createdAt}
          />
        </Row>

        {/* 본문 */}
        <div className={styles.body}>
          <p className={styles.text}>
            {data?.targetNickname && (
              <span className={styles.target}>@{data.targetNickname ?? ""}</span>
            )}

            {data?.content ?? ""}
          </p>

          {isActionsViewShow && (
            <div className={styles.actions_view}>
              <button className={styles.action} onClick={onReply}>
                답글달기
              </button>

              {userId === data?.author.id && (
                <button className={styles.action} onClick={onEdit}>
                  수정
                </button>
              )}

              {userId === data.author.id && (
                <button className={styles.action} onClick={onDelete}>
                  삭제
                </button>
              )}
            </div>
          )}
        </div>
      </Column>

      <Column className={styles.recomments_wrapper}>
        {recommentsList.map((item) => (
          <CommentItem
            data={item}
            key={item.id}
            isRecomment
            onSelectComment={onSelectComment}
            onChange={onChange}
          />
        ))}
      </Column>

      {!!data.recommentCount && (!isRecommentsShow || hasNextPage) && (
        <button className={styles.more_button} onClick={onShowRecomments}>
          <div />

          {isRecommentsShow && <p>답글 더보기</p>}
          {!isRecommentsShow && <p>답글 {data.recommentCount}개 모두 보기</p>}
        </button>
      )}
    </Column>
  );
}
