import React, { useEffect, useState } from "react";

/**
 *@description mobile 스크린인지 확인하는 훅
 */
function useIsMobile(breakpoint = 768) {
  const [isMobileSize, setMobileSize] = useState(false);

  useEffect(() => {
    const check = () => setMobileSize(window.innerWidth <= breakpoint);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobileSize;
}

export default useIsMobile;
