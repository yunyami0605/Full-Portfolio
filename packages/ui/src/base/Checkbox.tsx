"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  error?: string;
};

/**
 *@description 공통 체크박스 컴포넌트
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        {...props}
        className={clsx(
          "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
          error && "border-red-500",
          className,
        )}
      />
    );
  },
);

Checkbox.displayName = "Checkbox";
