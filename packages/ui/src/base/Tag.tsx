"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type TagProps = {
  children: ReactNode;
  variant?: "gray" | "blue" | "green" | "red" | "yellow";
  outline?: boolean;
  className?: string;
};

const variantMap: Record<string, string> = {
  gray: "bg-gray-100 text-gray-800",
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
};

const outlineMap: Record<string, string> = {
  gray: "border border-gray-300 text-gray-800 bg-white",
  blue: "border border-blue-300 text-blue-800 bg-white",
  green: "border border-green-300 text-green-800 bg-white",
  red: "border border-red-300 text-red-800 bg-white",
  yellow: "border border-yellow-300 text-yellow-800 bg-white",
};

export const Tag = ({ children, variant = "gray", outline = false, className }: TagProps) => {
  return (
    <span
      className={clsx(
        "inline-block px-2 py-0.5 text-xs font-medium rounded",
        outline ? outlineMap[variant] : variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
