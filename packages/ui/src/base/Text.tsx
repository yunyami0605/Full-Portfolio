import clsx from "clsx";
import { JSX } from "react";
import styles from "./Text.module.scss";

type TextProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
};

/**
 * @description 공통 Text 컴포넌트
 */
export const Text = ({ children, as = "span", weight = "medium", className = "" }: TextProps) => {
  const Component = as;

  return (
    <Component className={clsx(styles.text, styles["text-base"], styles[weight], className)}>
      {children}
    </Component>
  );
};
