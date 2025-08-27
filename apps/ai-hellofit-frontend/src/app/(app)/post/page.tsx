"use client";

import styles from "./Post.module.scss";
import React from "react";
import { PageWrapper } from "@/shared/components";
import { Column } from "@my/ui";
import PostItem from "@/features/post/_components/item/PostItem";
import { useGetPostsApi } from "@/features/post/_hooks/query";
import { useRouter } from "next/navigation";
import RegisterButton from "@/features/post/_components/buttons/RegisterButton";

/**
 *@description 게시글 목록 페이지
 */
function PostsPage() {
  const router = useRouter();
  const { data } = useGetPostsApi();

  const onMoveContent = (id: string) => {
    router.push(`/post/${id}`);
  };

  return (
    <PageWrapper withHeader={false}>
      <Column className={styles.posts_container}>
        {data?.data.map((item) => (
          <React.Fragment key={item.id}>
            <PostItem onClick={(id: string) => onMoveContent(id)} {...item} />
          </React.Fragment>
        ))}
      </Column>

      <RegisterButton />
    </PageWrapper>
  );
}

export default PostsPage;
