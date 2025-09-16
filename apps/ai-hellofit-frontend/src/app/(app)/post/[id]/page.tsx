"use client";

import styles from "./PostContentPage.module.scss";
import React, { useState } from "react";
import { useDeletePostApi, useGetPostOneApi } from "@/features/post/_hooks/query";
import { useParams } from "next/navigation";
import { IconButton, PageWrapper } from "@/shared/components";
import { ActionSheet, Popup, Row, Text } from "@my/ui";
import { useRouter } from "next/navigation";
import { getRelativeTime } from "@/libs/time";
import Image from "next/image";
import PostInfo from "@/features/post/_components/info/PostInfo";
/**
 *@description 게시글 컨텐츠 페이지
 */
function PostContentPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const router = useRouter();

  // 삭제/수정 액션시트 on/off
  const [isMoreActionSheetOpen, setMoreActionSheetOpen] = useState(false);

  // 삭제, 차단 팝업 on/off state
  const [isWarningPopupOpen, setWarningPopupOpen] = useState(false);
  const isAuthor = true;

  // 게시글 데이터 요청
  const { data } = useGetPostOneApi(id);
  const deletePostApi = useDeletePostApi(id);

  const { title, content, updatedAt, images, ...subInfo } = data?.data ?? {
    title: "",
    content: "",
    updatedAt: "",
    images: [],
  };

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

  const onBlockUser = () => {
    // TODO 차단 로직 추가
  };

  // const onLike = () => {};
  // const onComment = () => {
  //   // 댓글 페이지로 이동
  // };

  return (
    <PageWrapper withHeader={false} className={styles.container}>
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

      <section className={styles.container}>
        {/* 상단 프로필 영역 */}
        <Row className={styles.top_helper_section} justify="between">
          <Row className={styles.profile}>
            <img src="/images/image_tmp.jpg" alt="profile" className={styles.profileImage} />

            <Text>ldh_sky</Text>
          </Row>

          <IconButton
            iconName="More"
            onClick={() => setMoreActionSheetOpen(true)}
            size={34}
            className={styles.more_button}
          />
        </Row>

        {/* 게시글 이미지 */}
        <div>
          {images[0] ? (
            <Image
              className={styles.post_image}
              src={images[0] ?? ""}
              alt="게시글 이미지"
              width={360}
              height={360}
            />
          ) : (
            <div className={styles.dummy_post_image}></div>
          )}
        </div>

        {/* 버튼 영역 */}
        <Row className={styles.button_group}>
          <Row className={styles.buttons_left}>
            <PostInfo {...subInfo} size="normal" onLike={() => {}} onComment={() => {}} />
          </Row>
        </Row>

        {/* 본문 영역 */}
        <div className={styles.content_wrapper}>
          <p className={styles.date}>{getRelativeTime(updatedAt ?? "")}</p>

          <p className={styles.title}>{title ?? ""}</p>

          <p className={styles.content}>{content ?? ""}</p>
        </div>
      </section>
    </PageWrapper>
  );
}

export default PostContentPage;
