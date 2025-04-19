import { CheckboxList } from "./NestedCheckboxes.types";
import style from "./NestedCheckboxes.module.css";
import { CheckBoxInput } from "./CheckBoxInput";

type CheckBoxRendererProps = {
  checkboxList: CheckboxList;
  depth: number;
  path: number[];
  onCheck: (path: number[]) => void;
};
export function CheckBoxRenderer({
  checkboxList,
  depth,
  onCheck,
  path,
}: CheckBoxRendererProps) {
  return (
    <ul role="tree">
      {checkboxList.map((checkboxItem) => {
        return (
          <li
            key={checkboxItem.id}
            style={{ paddingLeft: `${depth * 10}px` }}
            className={style.listItem}
            role="treeitem"
          >
            <CheckBoxInput
              checkboxData={checkboxItem}
              onCheck={onCheck}
              path={path}
            />
            {checkboxItem.children && checkboxItem.children?.length > 0 && (
              <CheckBoxRenderer
                checkboxList={checkboxItem.children}
                depth={depth + 1}
                onCheck={onCheck}
                path={[...path, checkboxItem.id]}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
