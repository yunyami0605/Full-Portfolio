"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import styles from "./Checkbox.module.scss";
import { FaRegCheckCircle } from "react-icons/fa";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  error?: string;
};

/**
 * @description 공통 체크박스 컴포넌트
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, checked, ...props }, ref) => {
    return (
      <label className={clsx(styles.wrapper, className)}>
        <input
          ref={ref}
          type="checkbox"
          {...props}
          className={clsx(styles.checkbox, error && styles.error, className)}
        />

        <span className={clsx(styles.icon, error && styles.error)}>
          {checked ? <FaRegCheckCircle fill={"#0094ff"} /> : <FaRegCheckCircle fill={"#9ea1a8"} />}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
