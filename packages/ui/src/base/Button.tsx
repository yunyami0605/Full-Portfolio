"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

/**
 *@description 공통 컴포넌트 버튼
 */
export const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button onClick={onClick} className={clsx(styles.button, children, className)}>
      {children}
    </button>
  );
};
