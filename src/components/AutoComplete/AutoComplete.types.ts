import { ReactNode } from 'react';

export type Option = { label: ReactNode; value: string };
export type AutoCompleteProps = {
  options: Option[];
  onSearch?: (val: string) => void;
  onSelect?: (val: string, option: Option) => void;
  isLoading?: boolean;
  getOptionLabel?: (option: Option) => string;
};
