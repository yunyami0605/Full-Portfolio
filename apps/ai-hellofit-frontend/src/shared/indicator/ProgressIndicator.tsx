import clsx from "clsx";
import styles from "./ProgressIndicator.module.scss";
import React from "react";

type Props = {
  current: number;
  total: number;
};

/**
 *@description 진행도 표시 컴포넌트
 */
function ProgressIndicator({ current, total }: Props) {
  const progress = (current / total) * 100;

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressIndicator;
