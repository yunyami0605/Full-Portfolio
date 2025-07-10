import clsx from "clsx";
import { JSX } from "react";

type TextProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  color?: "gray" | "black" | "white" | "red" | "blue";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
};

const sizeMap = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const colorMap = {
  gray: "text-gray-500",
  black: "text-black",
  white: "text-white",
  red: "text-red-500",
  blue: "text-blue-500",
};

const weightMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const Text = ({
  children,
  as = "span",
  size = "base",
  color = "black",
  weight = "medium",
  className = "",
}: TextProps) => {
  const Component = as;
  return (
    <Component className={clsx(sizeMap[size], colorMap[color], weightMap[weight], className)}>
      {children}
    </Component>
  );
};
