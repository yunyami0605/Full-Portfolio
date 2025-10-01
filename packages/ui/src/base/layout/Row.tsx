import { ReactNode, CSSProperties, JSX, AriaRole } from "react";
import clsx from "clsx";
import styles from "./Row.module.scss";

type Align = "start" | "center" | "end";
type Justify = "start" | "center" | "end" | "between" | "around";

type RowProps = {
  children: ReactNode;
  align?: Align;
  justify?: Justify;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  role?: AriaRole;
  onClick?: () => void;
};

/**
 * @description 수평 레이아웃 Row 컴포넌트
 */
export function Row({
  children,
  align = "center",
  justify = "start",
  className,
  style,
  as = "div",
  role,
  onClick,
}: RowProps) {
  const Component = as;

  return (
    <Component
      onClick={onClick}
      role={role}
      className={clsx(
        styles.row,
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
