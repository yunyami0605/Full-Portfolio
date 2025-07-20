import clsx from "clsx";
import styles from "./Card.module.scss";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

/**
 *@description 카드 형태 레이아웃
 */
function Card({ children, className, onClick }: Props) {
  return (
    <section className={clsx(styles.card, className)} onClick={onClick}>
      {children}
    </section>
  );
}

export default Card;
