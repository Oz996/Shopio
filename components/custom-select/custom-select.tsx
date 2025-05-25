"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import styles from "./custom-select.module.scss";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "grape", label: "Grape" },
];

export default function CustomSelect() {
  return (
    <Select.Root onValueChange={(value) => console.log("value", value)}>
      <Select.Trigger className={styles.trigger}>
        <Select.Value placeholder="Select a fruit" />
        <Select.Icon className={styles.icon}>
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.content}>
          <Select.ScrollUpButton className={styles.scrollButton}>
            ↑
          </Select.ScrollUpButton>
          <Select.Viewport className={styles.viewport}>
            {options.map((option) => (
              <Select.Item
                key={option.label}
                value={option.value}
                className={styles.item}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className={styles.itemIndicator}>
                  <Check size={12} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.scrollButton}>
            ↓
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
