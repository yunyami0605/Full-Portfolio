import styles from "./RecordPage.module.scss";
import React, { Fragment } from "react";
import { Button, Row, Text } from "@my/ui";
import RecordCard from "@/features/diet/_components/main/view/RecordCard";
import { IconButton, SmallRoundedButton } from "@/shared/components";

function RecordPage() {
  const tmp = Array.from({ length: 4 });

  return (
    <section className={styles.page_layout}>
      <section className={styles.top_wrapper}>
        <Text className={styles.top_wrapper_title}>나의 기록</Text>

        <Button className={styles.calendar_go_button}>
          <Text>캘린더 보기</Text>

          <IconButton iconName="Right" fill={"#333"} size={18} />
        </Button>
      </section>

      <Row className={styles.tab_list}>
        <SmallRoundedButton name={"운동"} isClicked={true} />
        <SmallRoundedButton name={"식단"} isClicked={false} />
      </Row>

      {tmp.map((item, i) => (
        <Fragment key={i}>{<RecordCard title={""} />}</Fragment>
      ))}
    </section>
  );
}

export default RecordPage;
