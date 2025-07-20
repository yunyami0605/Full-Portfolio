"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Select.module.scss";

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  error?: string;
  placeholder?: string;
};

/**
 * @description 공통 Select 컴포넌트
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, className, error, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={clsx(styles.select, error && styles.error, className)}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  },
);

Select.displayName = "Select";
