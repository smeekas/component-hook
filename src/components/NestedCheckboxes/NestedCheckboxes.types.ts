export type CheckboxItem = {
  id: number;
  name: string;
  checked?: boolean | "indeterminate";
  children?: CheckboxItem[];
};

export type CheckboxList = CheckboxItem[];
