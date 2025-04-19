import { CheckboxItem, CheckboxList } from "./NestedCheckboxes.types";

export function updateAncestors(checkboxes: CheckboxList, path: number[]) {
  const newCheckboxes = structuredClone(checkboxes);
  if (path.length === 0) return newCheckboxes;
  const currId = path[0];
  const remainingPath = path.slice(1);
  const processedCheckboxes: CheckboxList = newCheckboxes.map((checkItem) => {
    if (checkItem.id !== currId) return checkItem; // id do not match return as it is
    if (remainingPath.length === 0) {
      // currId is last element
      // this is end of path
      const newChecked =
        checkItem.checked === "indeterminate" ? true : !checkItem.checked;
      // indeterminate become checked and if not then reversed
      return { ...checkItem, checked: newChecked };
    } else {
      // this is not end of path
      // current state of checkbox depends on child elements too
      const newChild = checkItem.children
        ? updateAncestors(checkItem.children, remainingPath)
        : checkItem.children; // update childrens
      // state of current checkbox depends on this checkbox's children.
      const areAllChildChecked = newChild?.every(
        (child) => child.checked === true,
      );
      const areAllChildUnChecked = newChild?.every(
        (child) => child.checked === false || !child.checked, // checked might not exists
      );
      if (areAllChildChecked) {
        return { ...checkItem, children: newChild, checked: true };
      }
      if (areAllChildUnChecked)
        return { ...checkItem, children: newChild, checked: false };

      return { ...checkItem, children: newChild, checked: "indeterminate" };
    }
  });
  return processedCheckboxes;
}

export function findAndUpdateChild(checkboxes: CheckboxList, id: number) {
  // find checkbox with given id
  const updated: CheckboxList = checkboxes.map((checkboxItem) => {
    if (checkboxItem.id === id) {
      return {
        ...checkboxItem,
        checked: checkboxItem.checked, // current checkbox is already been updated in updateAncestors
        children: checkboxItem.children
          ? updateChild(checkboxItem.children, checkboxItem.checked)
          : checkboxItem.children, // update all childrens with checkboxItem.checked
      };
    } else {
      // if id do not match, search the childrens
      return {
        ...checkboxItem,
        children: checkboxItem.children
          ? findAndUpdateChild(checkboxItem.children, id)
          : undefined,
      };
    }
  });
  return updated;
}
function updateChild(
  checkboxes: CheckboxList,
  checked: CheckboxItem["checked"],
) {
  const updatedCheckboxes: CheckboxList = checkboxes.map((checkboxItem) => {
    return {
      ...checkboxItem,
      checked: checked,
      children: checkboxItem.children
        ? updateChild(checkboxItem.children, checked)
        : undefined,
    };
  });
  return updatedCheckboxes;
}
