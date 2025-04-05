export interface GridLightProps {
  shape: number[][];
}

export interface GridLightCellProps {
  show: boolean;
  onClick: (index: number) => void;
  index: number;
  lighted: boolean;
}
