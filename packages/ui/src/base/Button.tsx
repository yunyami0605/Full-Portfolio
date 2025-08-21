"use client";

import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 *@description 공통 컴포넌트 버튼
 */
export const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button onClick={onClick} className={clsx(styles.button, className)}>
      {children}
    </button>
  );
};
