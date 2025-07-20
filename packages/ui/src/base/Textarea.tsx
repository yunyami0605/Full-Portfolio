"use client";

import clsx from "clsx";
import { forwardRef, TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.scss";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

/**
 * @description 공통 Textarea 컴포넌트
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={clsx(styles.textarea, error && styles.error, className)}
      />
    );
  },
);

Textarea.displayName = "Textarea";
