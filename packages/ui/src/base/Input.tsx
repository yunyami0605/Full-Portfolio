"use client";

import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

/**
 *@description 공통 Input 컴포넌트
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(
          "border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500",
          error && "border-red-500",
          className,
        )}
      />
    );
  },
);

Input.displayName = "Input";
