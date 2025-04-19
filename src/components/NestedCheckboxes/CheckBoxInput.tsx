import { useEffect, useRef } from "react";
import style from "./NestedCheckboxes.module.css";
import { CheckboxItem } from "./NestedCheckboxes.types";
type CheckBoxInputProps = {
  checkboxData: CheckboxItem;
  onCheck: (path: number[]) => void;
  path: number[];
};
export function CheckBoxInput({
  checkboxData: { id, name, checked },
  onCheck,
  path,
}: CheckBoxInputProps) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (checked === "indeterminate") {
      ref.current.indeterminate = true;
    } else ref.current.indeterminate = false;
  }, [checked]);

  return (
    <>
      <div className={style.checkbox}>
        <input
          id={id.toString()}
          type="checkbox"
          aria-checked={checked === "indeterminate" ? "mixed" : checked}
          ref={ref}
          checked={checked !== "indeterminate" ? checked : false}
          onChange={() => onCheck([...path, id])}
        />
        <label htmlFor={id.toString()}>{name}</label>
      </div>
    </>
  );
}
