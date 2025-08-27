import clsx from "clsx";
import { LabelHTMLAttributes } from "react";
import styles from "./Label.module.scss";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  classNameRequired?: string;
};

/**
 * @description label 공통 컴포넌트
 */
export const Label = ({
  children,
  required,
  className,
  classNameRequired,
  ...props
}: LabelProps) => {
  return (
    <label className={clsx(styles.label, className)} {...props}>
      {children}
      {required && <span className={clsx(classNameRequired, styles.required)}>*</span>}
    </label>
  );
};
