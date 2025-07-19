import { useEffect } from "react";

/**
 *@description modal 열릴때, 스크롤 방지
 */
function useScrollLock(lock: boolean) {
  //
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lock]);
}

export default useScrollLock;
