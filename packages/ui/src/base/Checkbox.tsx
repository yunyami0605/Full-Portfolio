"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import styles from "./Checkbox.module.scss";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  error?: string;
};

/**
 * @description 공통 체크박스 컴포넌트
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        {...props}
        className={clsx(styles.checkbox, error && styles.error, className)}
      />
    );
  },
);

Checkbox.displayName = "Checkbox";
