import { MyDomRect, Position } from './tooltip.types';

export const getPos: Record<
  Position | 'follow',
  (origin: MyDomRect, tooltip: MyDomRect) => Partial<React.CSSProperties>
> = {
  'center-top': (o, t) => {
    return {
      transform: `translate(${o.width / 2 - t.width / 2}px,${-t.height}px)`,
      left: `${o.left}px`,
      top: `${o.top}px`,
    };
  },
  'center-bottom': (o, t) => {
    return {
      transform: `translate(${o.width / 2 - t.width / 2}px,${o.height}px)`,
      left: `${o.left}px`,
      top: `${o.top}px`,
    };
  },
  'left-start': (o, t) => {
    return {
      transform: `translate(${-t.width - 2}px,${0}px)`,
      left: `${o.left}px`,
      top: `${o.top}px`,
    };
  },
  'left-center': (o, t) => {
    return {
      transform: `translate(${-t.width - 2}px,${o.height / 2 - t.height / 2}px)`,
      left: `${o.left}px`,
      top: `${o.top}px`,
    };
  },
  follow: (o) => {
    return {
      transform: `translate(${o.x - o.left + 6}px,${o.y - o.top + 6}px)`,
      left: `${o.left}px`,
      top: `${o.top}px`,
    };
  },
};
