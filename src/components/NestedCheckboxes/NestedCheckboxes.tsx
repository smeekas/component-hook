import { useState } from "react";
import { CheckBoxRenderer } from "./CheckBoxRenderer";
import { CheckboxList } from "./NestedCheckboxes.types";
import { findAndUpdateChild, updateAncestors } from "./utils";

type NestedCheckboxesProps = {
  checkboxes: CheckboxList;
};
export function NestedCheckboxes({ checkboxes }: NestedCheckboxesProps) {
  const [checkedState, setCheckedState] = useState(checkboxes);

  const onCheck = (path: number[]) => {
    // every checkbox will return path of ids from outer most element to current checkbox
    setCheckedState((prev) => {
      const updtaedCheckboxes = updateAncestors(prev, path); // update parents
      // parent may become indeterminate, checked or unchecked

      const updatedChilds = findAndUpdateChild(
        updtaedCheckboxes,
        path[path.length - 1],
      ); //update childs, they will be either checked or unchecked
      return updatedChilds;
    });
  };
  return (
    <>
      <CheckBoxRenderer
        onCheck={onCheck}
        checkboxList={checkedState}
        depth={0}
        path={[]}
      />
    </>
  );
}
