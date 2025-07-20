import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./LayoutView.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * @description 모바일 우선 공통 레이아웃 컴포넌트
 */
export function BaseLayout({ children, className }: Props) {
  return <section className={clsx(styles.layout, className)}>{children}</section>;
}
