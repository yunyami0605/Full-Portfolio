import clsx from "clsx";
import { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

/**
 *@description label 공통 컴포넌트
 */
export const Label = ({ children, required, className, ...props }: LabelProps) => {
  return (
    <label {...props} className={clsx("block text-sm font-medium text-gray-700", className)}>
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};
