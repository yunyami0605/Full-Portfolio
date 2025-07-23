import clsx from "clsx";
import styles from "./SmallRoundedButton.module.scss";
import React from "react";
import { Button, Text } from "@my/ui";

type Props = {
  name: string;
  isClicked: boolean;
};
function SmallRoundedButton({ name, isClicked }: Props) {
  return (
    <Button
      className={clsx(
        styles.rounded_button,
        isClicked ? styles.clicked_button : styles.unclicked_button,
      )}
    >
      <Text>{name}</Text>
    </Button>
  );
}

export default SmallRoundedButton;
