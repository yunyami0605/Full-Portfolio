import clsx from "clsx";
import styles from "./Header.module.scss";
import React, { ReactNode } from "react";
import { PageBackButton } from "../button/BackButton";

type Props = {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
  back?: boolean;
  noHeader?: boolean;
};

/**
 *@description 페이지 헤더
 */
export function Header({ title, left, right, className, back, noHeader }: Props) {
  if (noHeader) return <></>;

  return (
    <header className={clsx(styles.header, className)}>
      <div className={styles.left}>{back ? <PageBackButton /> : left}</div>
      <div className={clsx(styles.title, styles.center)}>{title}</div>
      <div className={styles.right}>{right}</div>
    </header>
  );
}
