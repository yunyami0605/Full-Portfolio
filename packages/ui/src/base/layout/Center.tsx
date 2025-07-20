import { ReactNode, JSX } from "react";
import clsx from "clsx";
import styles from "./Center.module.scss";

type CenterProps = {
  children: ReactNode;
  column?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * @description 수직 수평 정중앙 정렬용 컴포넌트
 */
export function Center({ children, column = false, className, as = "div" }: CenterProps) {
  const Component = as;
  return (
    <Component className={clsx(styles.center, column && styles.column, className)}>
      {children}
    </Component>
  );
}
