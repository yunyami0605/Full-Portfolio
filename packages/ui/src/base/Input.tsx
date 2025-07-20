"use client";

import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

/**
 * @description 공통 Input 컴포넌트
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(styles.input, error && styles.error, className)}
      />
    );
  },
);

Input.displayName = "Input";
