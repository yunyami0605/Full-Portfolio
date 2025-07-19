import React, { useCallback, useState } from "react";

/**
 *@description modal on off state, toggle
 */
function useModal() {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}

export default useModal;
