import styles from "./PostItem.module.scss";
import React, { useCallback, useState } from "react";
import { Button, Center, Column, Row, Text } from "@my/ui";
import { PostItem as PostItemType } from "../../_types/data";
import ActionView from "../info/ActionView";
import { AuthorInfoView } from "@/shared/components/views/AuthorInfoView";
import PostImage from "../image/PostImage";
import clsx from "clsx";

type Props = PostItemType & {
  onClick?: (id: string) => void;
  isExpand?: boolean;
  onMoreOpen?: () => void;
};

/**
 *@description 게시글 항목 (목록)
 */
function PostItem(props: Props) {
  const [expand, setExpand] = useState(props.isExpand);

  const onExpand = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setExpand((prev) => !prev);
  }, []);

  return (
    <Column className={styles.post_container}>
      <Column className={styles.post_wrapper}>
        {/* 작성자 정보 뷰 */}
        <Row className={styles.post_author_info_view}>
          <AuthorInfoView
            authorImage={props.author?.imageUrl}
            authorName={props.author?.nickname ?? ""}
            date={props.createdAt}
            onMoreClick={props.onMoreOpen}
          />
        </Row>

        <div
          role={"button"}
          className={clsx(
            styles.post_move_action_view,
            props.onClick && styles.content_move_button,
          )}
          onClick={() => {
            if (props.onClick) {
              props.onClick(props.id);
            }
          }}
        >
          <Center className={styles.image_view}>
            {/* 게시글 이미지 */}
            <PostImage imageUrl={props.images[0]} alt={props.title} />
          </Center>

          {/* 게시글 좋아요, 댓글수, 조회수 정보 뷰 */}
          <Row className={styles.action_view_wrapper}>
            <ActionView {...props} />
          </Row>

          <Text className={styles.post_title}>{props.title}</Text>

          <Text className={clsx(styles.post_content, expand && styles.expanded)}>
            {props.content}
          </Text>
        </div>

        {!expand && (
          <Button onClick={(e) => onExpand(e)} className={styles.more_button}>
            더보기
          </Button>
        )}
      </Column>
    </Column>
  );
}

export default React.memo(PostItem);
