import styles from "./CommentsView.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { Column } from "@my/ui";
import { CommentItem } from "../item/CommentItem";
import { SelectedCommentItemType, useGetCommentsApi } from "../..";
import { CommentInput } from "../input/CommentInput";
import { useParams } from "next/navigation";

/**
 *@description 게시글 댓글 목록 + 입력 뷰
 */
function CommentsView() {
  const params = useParams<{ id: string }>();
  const { id: postId } = params;
  const commentsLoaderRef = useRef<HTMLDivElement | null>(null);

  //  댓글 목록 데이터 요청
  const { data: commentsData, ...commentsApiState } = useGetCommentsApi(postId, 10, !!postId);

  // 댓글 목록
  const commentsList = commentsData?.pages.flatMap((page) => page.data.items);

  const [commentInput, setCommentInput] = useState("");

  const [selectedCommentItem, setSelectedCommentItem] = useState<SelectedCommentItemType>();

  // 댓글 선택 이벤트
  const onSelectComment = (selectedComment: SelectedCommentItemType) => {
    setSelectedCommentItem(selectedComment);
  };

  // 선택된 댓글 초기화
  const onInitSelectedComment = () => {
    setSelectedCommentItem(undefined);
  };

  useEffect(() => {
    if (!commentsLoaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          commentsApiState.hasNextPage &&
          !commentsApiState.isFetchingNextPage
        ) {
          commentsApiState.fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(commentsLoaderRef.current);

    return () => {
      if (commentsLoaderRef.current) observer.unobserve(commentsLoaderRef.current);
    };
  }, [
    commentsApiState.fetchNextPage,
    commentsApiState.hasNextPage,
    commentsApiState.isFetchingNextPage,
  ]);

  return (
    <Column as="section" className={styles.comments_view}>
      {(commentsList ?? []).map((item) => (
        <Column key={item.id} className={styles.comments_wrapper}>
          <CommentItem
            onChange={(value) => setCommentInput(value)}
            data={item}
            onSelectComment={onSelectComment}
          />
        </Column>
      ))}

      <div ref={commentsLoaderRef} style={{ height: 20 }} />

      <CommentInput
        onInitSelectedComment={onInitSelectedComment}
        postId={postId}
        selectedCommentItem={selectedCommentItem}
        comment={commentInput}
        onChange={(value) => setCommentInput(value)}
      />
    </Column>
  );
}

export default CommentsView;
