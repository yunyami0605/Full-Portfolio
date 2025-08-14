import clsx from "clsx";
import styles from "./PageWrapper.module.scss";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  withHeader?: boolean;
  className?: string;
};

/**
 *@description 기본 페이지 Wrapper
 */
export function PageWrapper({ children, className, withHeader = true }: Props) {
  return (
    <section
      className={clsx(styles.page_layout, withHeader && styles.page_layout_with_header, className)}
    >
      {children}
    </section>
  );
}
