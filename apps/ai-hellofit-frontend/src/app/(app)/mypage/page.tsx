"use client";

import styles from "./Mypage.module.scss";
import React, { useEffect, useRef, useState } from "react";
import ProfileImageRegisterButton from "@/features/user/_components/mypage/ProfileImageRegisterButton";
import ProfileEditButton from "@/features/user/_components/mypage/ProfileEditButton";
import { Column, Row } from "@my/ui";
import UserInfo from "@/features/user/_components/mypage/UserInfo";
import { PageWrapper, Tab } from "@/shared/components";
import { useGetPostsMeApi } from "@/features/post/_hooks/query";
import { useGetCommentsMeApi } from "@/features/comment";
import UserCommentTabView from "@/features/user/_components/mypage/view/UserCommentsTabView";
import UserPostsTabView from "@/features/user/_components/mypage/view/UserPostsTabView";

/**
 *@description 내 계정 페이지
 */
function Mypage() {
  const [tab, setTab] = useState<"POST" | "COMMENT">("POST");
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 내 게시글 목록 조회
  const { data: postsMeData, ...postsApiState } = useGetPostsMeApi(10);

  // 내 댓글 목록 조회
  const { data: commentsMeData, ...commentsApiState } = useGetCommentsMeApi(10);

  // 댓글 목록
  const postsList = (postsMeData?.pages ?? []).flatMap((page) => page.items);

  // 댓글 목록
  const commentsList = (commentsMeData?.pages ?? []).flatMap((page) => page.data.items);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          postsApiState.hasNextPage &&
          !postsApiState.isFetchingNextPage
        ) {
          postsApiState.fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [postsApiState.fetchNextPage, postsApiState.hasNextPage, postsApiState.isFetchingNextPage]);

  useEffect(() => {
    if (!loaderRef.current) return;

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

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [
    commentsApiState.fetchNextPage,
    commentsApiState.hasNextPage,
    commentsApiState.isFetchingNextPage,
  ]);

  return (
    <PageWrapper withHeader={false}>
      <Row className={styles.top_info_container}>
        <Column align="center">
          <ProfileImageRegisterButton />

          <ProfileEditButton />
        </Column>

        <UserInfo />
      </Row>

      <Column className={styles.bottom_info_container}>
        <Row className={styles.tab_list}>
          <Tab name={"내 게시글"} isChecked={tab === "POST"} onClick={() => setTab("POST")} />
          <Tab name={"내 댓글"} isChecked={tab === "COMMENT"} onClick={() => setTab("COMMENT")} />
        </Row>
      </Column>

      <Column className={styles.comment_me_container}>
        {tab === "POST" && <UserPostsTabView data={postsList} />}
        {tab === "COMMENT" && <UserCommentTabView data={commentsList} />}

        <div ref={loaderRef} style={{ height: 20 }} />
      </Column>
    </PageWrapper>
  );
}

export default Mypage;
