import styles from "./UserPostsTabView.module.scss";
import React, { useState } from "react";
import { Center, Column, Row, Text } from "@my/ui";
import { PostItem as PostItemType } from "@/features/post/_types/data";
import ActionView from "@/features/post/_components/info/ActionView";
import PostImage from "@/features/post/_components/image/PostImage";
import { useRouter } from "next/navigation";

type Props = {
  data: PostItemType[];
};

/**
 *@description 내 게시글 탭 뷰
 */
function UserPostsTabView({ data }: Props) {
  const router = useRouter();

  const onClick = (id: string) => {
    router.push(`/post/${id}`);
  };
  return (
    <Column className={styles.tab_view}>
      {data.map((item) => (
        <Row
          key={item.id}
          role="button"
          onClick={() => onClick(item.id)}
          className={styles.my_post_item_wrapper}
        >
          <Center className={styles.post_image}>
            <PostImage imageUrl={item.images[0]} alt={item.title} />
          </Center>

          <Column justify="between" className={styles.post_datas_view}>
            <Column className={styles.text_view}>
              <Text className={styles.title}>{item.title ?? ""}</Text>
              <Text className={styles.content}>{item.content ?? ""}</Text>
            </Column>

            {/* 게시글 좋아요, 댓글수, 조회수 정보 뷰 */}
            <Row className={styles.action_view_wrapper}>
              <ActionView />
            </Row>
          </Column>
        </Row>
      ))}
    </Column>
  );
}

export default UserPostsTabView;
