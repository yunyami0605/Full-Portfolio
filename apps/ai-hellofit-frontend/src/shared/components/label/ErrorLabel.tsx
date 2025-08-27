import { Label, LabelProps } from "@my/ui";
import styles from "./ErrorLabel.module.scss";
import clsx from "clsx";

/**
 *@description error label
 */
export function ErrorLabel(props: LabelProps) {
  return (
    <Label className={clsx(styles.error_label)} {...props}>
      {props.children}
    </Label>
  );
}
