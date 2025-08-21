"use client";

import clsx from "clsx";
import styles from "./Dropdown.module.scss";
import { LabeledInput, LabeledInputProps } from "../input/LabeledInput";
import { useEffect, useRef, useState } from "react";

export type DropdownItem = { text: string; value: string };

type Props = {
  inputProps?: LabeledInputProps;
  dropdownStyle?: string;
  list: DropdownItem[];
  selectedItem?: DropdownItem;
  setSelectedItem: (item: DropdownItem) => void;
  id: string;
  placeholder: string;
};

/**
 *@description dropdown 공용 컴포넌트
 */
export const Dropdown = ({
  inputProps,
  dropdownStyle,
  list,
  setSelectedItem,
  selectedItem,
  placeholder,
  id,
}: Props) => {
  const [isOpen, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // 클릭 요소가 dropdown 내부가 아니면
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={clsx(styles.dropdown, dropdownStyle)} ref={dropdownRef}>
      <LabeledInput
        {...inputProps}
        id={id}
        readOnly
        placeholder={placeholder}
        onClick={() => setOpen(true)}
        value={selectedItem?.text}
      />

      <ul className={clsx(styles.dropdown_content, isOpen && styles.dropdown_content_show)}>
        {list.map((item, i) => (
          <li
            key={i}
            onClick={() => setSelectedItem(item)}
            className={clsx(selectedItem?.value === item.value && styles.selected_item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
