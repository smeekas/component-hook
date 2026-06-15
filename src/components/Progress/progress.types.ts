export type ProgressProps = {
  duration?: number;
  onComplete?: () => void;
  showProgress?: boolean;
  value?: number;
  start?: boolean;
  label?:string
};
