export type VirtualizedProps<T> = {
  list: T[];
  children: ({ item, index }: { item: T; index: number }) => React.ReactNode;
  size: number;
  overScan?: number;
  horizontal?: boolean;
};
