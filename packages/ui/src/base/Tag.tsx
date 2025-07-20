"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Tag.module.scss";

type TagProps = {
  children: ReactNode;
  variant?: "gray" | "blue" | "green" | "red" | "yellow";
  outline?: boolean;
  className?: string;
};

/**
 * @description 공통 Tag 컴포넌트
 */
export const Tag = ({ children, variant = "gray", outline = false, className }: TagProps) => {
  return (
    <span
      className={clsx(
        styles.tag,
        styles[variant],
        outline && styles.outline,
        outline && styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
