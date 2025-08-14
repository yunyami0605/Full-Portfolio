import clsx from "clsx";
import styles from "./RecordPage.module.scss";
import React, { Fragment, useState } from "react";
import { Button, Row, Text } from "@my/ui";
import { FaAngleRight } from "react-icons/fa";
import RecordCard from "@/features/record/_components/RecordCard";
import { SmallRoundedButton } from "@/shared/components";

type Props = {};
function RecordPage() {
  const tmp = Array.from({ length: 4 });
  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <Text className={styles.top_wrapper_title}>나의 기록</Text>

        <Button className={styles.calendar_go_button}>
          <Text>캘린더 보기</Text>

          <FaAngleRight fill={"#333"} size={18} />
        </Button>
      </section>

      <Row className={styles.tab_list}>
        <SmallRoundedButton name={"운동"} isClicked={true} />
        <SmallRoundedButton name={"식단"} isClicked={false} />
      </Row>

      {tmp.map((item, i) => (
        <Fragment key={i}>{<RecordCard />}</Fragment>
      ))}
    </section>
  );
}

export default RecordPage;
