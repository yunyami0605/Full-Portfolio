import styles from "./MainTopView.module.scss";
import React, { useState } from "react";
import { Button, Column, Row, Text } from "@my/ui";
import { IconButton, Tab } from "@/shared/components";
import ActiveRoundedButton from "../../button/ActiveRoundedButton";
import dayjs from "dayjs";

function MainTopView() {
  const [isMeal, setIsMeal] = useState(true);

  return (
    <Column className={styles.main_top_view}>
      <Row className={styles.main_top_view_wrapper} justify="between">
        <Text as="h2">나의 기록 및 추천</Text>

        <Button className={styles.calendar_show_button}>
          <Row>
            <Text as="p">캘린더 보기</Text>

            <IconButton iconName={"Right"} />
          </Row>
        </Button>
      </Row>

      <p className={styles.date}>{dayjs().format("YYYY년 MM월 DD일")} (토)</p>

      <Row className={styles.action_view}>
        <ActiveRoundedButton name={"식단"} isActive={isMeal} onClick={() => setIsMeal(true)} />

        <ActiveRoundedButton name={"운동"} isActive={!isMeal} onClick={() => setIsMeal(false)} />
      </Row>
    </Column>
  );
}

export default MainTopView;
