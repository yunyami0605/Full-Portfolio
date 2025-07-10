"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  error?: string;
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, className, error, ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={clsx(
          "border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none",
          error && "border-red-500",
          className,
        )}
      >
        {props.placeholder && (
          <option value="" disabled hidden>
            {props.placeholder}
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
