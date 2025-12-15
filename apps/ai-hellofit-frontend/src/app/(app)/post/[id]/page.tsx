"use client";

import styles from "./PostContentPage.module.scss";
import React, { useState } from "react";
import { useDeletePostApi, useGetPostOneApi } from "@/features/post/_hooks/query";
import { useParams } from "next/navigation";
import { PageWrapper } from "@/shared/components";
import { ActionSheet, Column, Popup, Row, Text } from "@my/ui";
import { useRouter } from "next/navigation";
import PostItem from "@/features/post/_components/item/PostItem";
import CommentsView from "@/features/comment/_components/view/CommentsView";
import { useUserId } from "@/features/user/_hooks/useUserId";
/**
 *@description 게시글 컨텐츠 페이지
 */
function PostContentPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const router = useRouter();

  const userId = useUserId();

  // 삭제/수정 액션시트 on/off
  const [isMoreActionSheetOpen, setMoreActionSheetOpen] = useState(false);

  // 삭제, 차단 팝업 on/off state
  const [isWarningPopupOpen, setWarningPopupOpen] = useState(false);

  // 게시글 데이터 요청
  const { data: postsData } = useGetPostOneApi(id);

  const isAuthor = React.useMemo(() => {
    if (!postsData?.data?.author?.id || !userId) return false;
    return userId === postsData.data.author.id;
  }, [postsData, userId]);

  const { title, content, updatedAt, images, ...subInfo } = postsData?.data ?? {
    title: "",
    content: "",
    updatedAt: "",
    images: [],
  };

  // 게시글 삭제
  const deletePostApi = useDeletePostApi(id);

  // 업데이트 페이지 이동
  const onMoveUpdateContent = () => {
    router.push(`/post/update/${id}`);
  };

  // 게시글 삭제
  const onDeleteContent = async () => {
    try {
      const res = await deletePostApi.mutateAsync();

      if (res.status === 200) {
        // 삭제 완료
        router.back();
      }
    } catch {
      window.alert("잘못된 접근입니다.");
    }
  };

  const onMoreOpen = () => {
    setMoreActionSheetOpen(true);
  };

  const onBlockUser = () => {
    // TODO 차단 로직 추가
  };

  return (
    <PageWrapper withHeader={false} topPadding={false} className={styles.container}>
      {/* 게시글 삭제/차단 팝업 */}
      <Popup
        isOpen={isWarningPopupOpen}
        title={isAuthor ? "게시글 삭제" : "유저 차단"}
        message={isAuthor ? "정말 삭제하시겠습니까?" : "정말 차단하시겠습니까?"}
        cancelText="취소"
        confirmText={isAuthor ? "삭제" : "차단"}
        onConfirm={isAuthor ? onDeleteContent : onBlockUser}
        onClose={() => setWarningPopupOpen(false)}
      />

      <ActionSheet
        isOpen={isMoreActionSheetOpen}
        options={[
          { label: isAuthor ? "수정" : "신고", onClick: onMoveUpdateContent },
          {
            label: isAuthor ? "삭제" : "차단",
            onClick: () => setWarningPopupOpen(true),
            isWarning: true,
          },
        ]}
        onClose={() => setMoreActionSheetOpen(false)}
      />

      <Column as="section" className={styles.container}>
        {/* 게시글 상세 내용 뷰 */}
        <Column as="section" className={styles.post_wrapper}>
          {postsData?.data && <PostItem {...postsData?.data} isExpand onMoreOpen={onMoreOpen} />}
        </Column>

        {/* 댓글 목록 뷰 */}
        <CommentsView />
      </Column>
    </PageWrapper>
  );
}

export default PostContentPage;
