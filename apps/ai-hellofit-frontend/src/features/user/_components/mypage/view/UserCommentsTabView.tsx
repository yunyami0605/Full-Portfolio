import clsx from "clsx";
import styles from "./UserCommentsTabView.module.scss";
import React, { useState } from "react";
import { Column } from "@my/ui";
import { CommentItemType } from "@/features/comment";
import { CommentItem } from "@/features/comment/_components/item/CommentItem";

type Props = {
  data: CommentItemType[];
};

/**
 *@description 마이페이지 > 자신 댓글 탭 뷰
 */
function UserCommentTabView({ data }: Props) {
  return (
    <Column className={styles.tab_view}>
      {data.map((item) => (
        <CommentItem
          isActionsViewShow={false}
          data={item}
          key={item.id}
          onSelectComment={() => {}}
          onChange={() => {}}
        />
      ))}
    </Column>
  );
}

export default UserCommentTabView;
