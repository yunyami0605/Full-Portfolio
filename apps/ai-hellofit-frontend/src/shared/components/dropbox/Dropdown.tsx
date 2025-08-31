"use client";

import clsx from "clsx";
import styles from "./Dropdown.module.scss";
import { LabeledInput, LabeledInputProps } from "../input/LabeledInput";
import { useEffect, useRef, useState } from "react";

export type DropdownItem<T = string> = { text: string; value: T };

type Props<T = string> = {
  inputProps?: LabeledInputProps;
  dropdownStyle?: string;
  list: DropdownItem<T>[];
  selectedItem?: DropdownItem<T>;
  onSelect: (item: DropdownItem<T>) => void;
  id: string;
  placeholder: string;
};

/**
 *@description dropdown 공용 컴포넌트
 */
export const Dropdown = <T,>({
  inputProps,
  dropdownStyle,
  list,
  onSelect: _onSelect,
  selectedItem,
  placeholder,
  id,
}: Props<T>) => {
  const [isOpen, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const onSelect = (item: DropdownItem<T>) => {
    setOpen(false);
    _onSelect(item);
  };

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
    <div
      className={clsx(styles.dropdown, dropdownStyle, styles.no_selected_item)}
      ref={dropdownRef}
    >
      <LabeledInput
        {...inputProps}
        id={id}
        type="button"
        placeholder={placeholder}
        onClick={() => setOpen(true)}
        defaultValue={selectedItem?.text ?? placeholder}
        style={selectedItem?.text ? {} : { color: "#c6c8cd", borderColor: "#c6c8cd" }}
      />

      <ul className={clsx(styles.dropdown_content, isOpen && styles.dropdown_content_show)}>
        {list.map((item, i) => (
          <li
            key={i}
            onClick={() => onSelect(item)}
            className={clsx(selectedItem?.value === item.value && styles.selected_item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
