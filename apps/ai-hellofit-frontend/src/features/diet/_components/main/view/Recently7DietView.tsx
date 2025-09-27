import clsx from "clsx";
import styles from "./Recently7DietView.module.scss";
import React, { useState } from "react";
import { Card, IconButton } from "@/shared/components";
import { Row, Text } from "@my/ui";
import { title } from "process";

type Props = {
  title: string;
};
function Recently7DietView({ title }: Props) {
  return (
    <Card>
      <Row className={styles.title_wrapper}>
        <Text className={styles.title}>{title}</Text>
      </Row>
    </Card>
  );
}

export default Recently7DietView;
