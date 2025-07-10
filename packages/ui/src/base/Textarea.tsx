import clsx from "clsx";
import { forwardRef, TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

/**
 *@description 공통 textare 컴포넌트
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={clsx(
          "border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none",
          error && "border-red-500",
          className,
        )}
      />
    );
  },
);

Textarea.displayName = "Textarea";
