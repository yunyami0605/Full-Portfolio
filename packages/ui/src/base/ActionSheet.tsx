import clsx from "clsx";
import styles from "./ActionSheet.module.scss";
import React from "react";

type Props = {
  isOpen: boolean;
  title?: string;
  options: {
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
export function ActionSheet({ isOpen, title, options, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={clsx(styles.sheet)} onClick={(e) => e.stopPropagation()}>
        {title && <div className={styles.title}>{title}</div>}

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
      </div>
    </div>
  );
}
