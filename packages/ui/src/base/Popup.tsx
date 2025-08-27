import styles from "./Popup.module.scss";
import React from "react";

type Props = {
  title?: string;
  isOpen: boolean;
  message: string;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
};
/**
 *@description 팝업 공통 컴포넌트
 */
export function Popup({
  title,
  isOpen,
  message,
  onClose,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  const onOk = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true" className={styles.backdrop} onClick={onClose}>
      <div className={styles.popup}>
        {title && <h3 className={styles.title}>{title}</h3>}

        <p className={styles.message}>{message}</p>

        <div className={styles.button_group}>
          {cancelText && (
            <button onClick={onClose} className={styles.cancel}>
              {cancelText}
            </button>
          )}

          <button onClick={onOk} className={styles.confirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
