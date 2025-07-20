"use client";

import React from "react";

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
    <button
      onClick={onClick}
      className={`text-amber-900 border-2 font-semibold px-4 py-2 rounded hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
};
