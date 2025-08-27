import { TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./LabeledInput.module.scss";
import { Label } from "@my/ui";

export type LabeledTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  required?: boolean;
  error?: string;
  label?: string;
  id: string;
  classNameWrapper?: string;
  className?: string;
  success?: string;
};

export const LabeledTextarea = ({
  id,
  required,
  error,
  label,
  classNameWrapper,
  className,
  success,
  ...textareaProps
}: LabeledTextareaProps) => {
  return (
    <div className={clsx(styles.input_wrapper, classNameWrapper)}>
      {label && (
        <Label htmlFor={id} required={required} className={styles.label}>
          {label}
        </Label>
      )}
      <textarea
        {...textareaProps}
        id={id}
        className={clsx(styles.textarea, error && styles.error, className)}
      />
      {error && <p className={clsx(styles.label, styles.error)}>{error}</p>}
      {!error && success && <p className={clsx(styles.label, styles.success)}>{success}</p>}
    </div>
  );
};
