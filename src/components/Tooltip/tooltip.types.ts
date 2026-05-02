import { ReactNode } from 'react';

export type TooltipProps = {
  children: ReactNode;
  title: ReactNode;
  follow?: boolean;
  position?: Position;
  open?: boolean;
};

type Horizontal = 'start' | 'end' | 'center';
type Vertical = 'top' | 'bottom';

export type AllPositions = `${Horizontal}-${Vertical}`;

export type Position =
  | 'center-top'
  | 'center-bottom'
  | 'left-start'
  | 'left-center';
export type MyDomRect = Omit<DOMRect, 'toJSON'>;
