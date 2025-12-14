import clsx from "clsx";
import styles from "./ActionSheet.module.scss";
import React from "react";

type Props = {
  isOpen: boolean;
  title?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  options?: {
    label: string;
    onClick: () => void;
    isWarning?: boolean;
  }[];
  onClose: () => void;
};

/**
 *@description 하단 액션 시트
 *@params optoins: 각 버튼 라벨, onclick, isWraning = 경고
 */
export function ActionSheet({ isOpen, title, header, children, options = [], onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={clsx(styles.sheet)} onClick={(e) => e.stopPropagation()}>
        {title && <div className={styles.title}>{title}</div>}

        {header && <div className={styles.header}>{header}</div>}

        {children ? (
          <div className={styles.content}>{children}</div>
        ) : (
          <div className={styles.options}>
            {options.map((opt, idx) => (
              <button
                key={idx}
                className={clsx(styles.option, {
                  [styles.warn]: opt.isWarning,
                })}
                onClick={() => {
                  opt.onClick();
                  onClose();
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
