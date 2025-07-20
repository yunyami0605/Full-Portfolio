"use client";

import { Input, Label } from "@my/ui";
import { InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./LabeledInput.module.scss";

type LabeledInputProps = InputHTMLAttributes<HTMLInputElement> & {
  required?: boolean;
  error?: string;
  label?: string;
  id: string;
  classNameWrapper?: string;
  className?: string;
};

/**
 *@description label + input + error 폼 형식 컴포넌트
 */
export const LabeledInput = ({
  id,
  required,
  error,
  label,
  classNameWrapper,
  className,
  ...inputProps
}: LabeledInputProps) => {
  return (
    <div className={clsx(styles.input_wrapper, classNameWrapper)}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}

      <Input
        {...inputProps}
        id={id}
        className={clsx(styles.input, error && styles.error, className)}
      />

      {error && <p className={clsx(styles.error)}>{error}</p>}
    </div>
  );
};
