import { ReactNode, JSX, CSSProperties } from "react";
import clsx from "clsx";
import styles from "./Column.module.scss";

type Align = "start" | "center" | "end";
type Justify = "start" | "center" | "end" | "between" | "around";

type ColumnProps = {
  children: ReactNode;
  align?: Align;
  justify?: Justify;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
};

/**
 * @description 수직 레이아웃 Column 컴포넌트
 */
export function Column({
  children,
  align = "start",
  justify = "start",
  className,
  as = "div",
  style,
}: ColumnProps) {
  const Component = as;

  return (
    <Component
      className={clsx(
        styles.column,
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  );
}
