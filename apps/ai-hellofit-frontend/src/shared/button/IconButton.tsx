import clsx from "clsx";
import styles from "./IconButton.module.scss";
import React from "react";
import { Button } from "@my/ui";
import { IconType } from "react-icons";

/**
 * FaRegBell : bell
 */
type Props = {
  icon: IconType;
  onClick?: () => void;
  size?: number;
  color?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 *@description 아이콘 레이아웃 button 컴포넌트
 */
function IconButton({
  icon: Icon,
  onClick,
  size = 20,
  color,
  className,
  disabled,
  ariaLabel,
}: Props) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(styles.icon_button, className)}
    >
      <Icon size={size} color={color} />
    </Button>
  );
}

export default IconButton;
