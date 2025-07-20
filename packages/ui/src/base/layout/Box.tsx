import { ReactNode, CSSProperties, JSX } from "react";
import clsx from "clsx";

type BoxProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * @description 범용 레이아웃 Wrapper 컴포넌트
 */
export const Box = ({ children, className, style, as = "div" }: BoxProps) => {
  const Component = as;
  return (
    <Component className={clsx(className)} style={style}>
      {children}
    </Component>
  );
};
