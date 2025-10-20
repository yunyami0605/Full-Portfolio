"use client";

import styles from "./PostList.module.scss";
import React, { useEffect, useRef } from "react";
import { PageWrapper } from "@/shared/components";
import { Column } from "@my/ui";
import PostItemComponent from "@/features/post/_components/item/PostItem";
import { useGetPostsApi } from "@/features/post/_hooks/query";
import { useRouter } from "next/navigation";
import RegisterButton from "@/features/post/_components/buttons/RegisterButton";
import { Cursor } from "@/shared/types/api";
import { GetPostsResponse } from "../../_types/response";

type Props = {
  initialPosts: Cursor<GetPostsResponse>;
};
/**
 *@description 게시글 목록 페이지 > 게시글 목록
 */
function PostList({ initialPosts }: Props) {
  const router = useRouter();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPostsApi(10, initialPosts);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }, // 100% 보일 때 실행
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const posts = data?.pages.flatMap((page) => page.items) ?? [];

  const onMoveContent = (id: string) => {
    router.push(`/post/${id}`);
  };

  return (
    <PageWrapper withHeader={false}>
      <Column className={styles.posts_container}>
        {posts.map((item) => (
          <PostItemComponent
            key={item.id}
            onClick={(id: string) => {
              onMoveContent(id);
            }}
            {...item}
          />
        ))}

        <div ref={loaderRef} style={{ height: 20 }} />
      </Column>

      <RegisterButton />
    </PageWrapper>
  );
}

export default PostList;
