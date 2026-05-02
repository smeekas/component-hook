import React, {
  MouseEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './tooltip.css';
import { MyDomRect, TooltipProps } from './tooltip.types';
import { getPos } from './getPos';

function Tooltip({
  children,
  open,
  title,
  follow = false,
  position = 'center-top',
}: TooltipProps) {
  const ref = useRef<null | HTMLDivElement>(null);
  const parent = useRef<null | HTMLElement>(null);

  const [pos, setPos] = useState<null | MyDomRect>(null);

  const childEle = React.isValidElement(children) ? (
    children
  ) : (
    <span>{children}</span>
  );
  const onMouseEnter: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target instanceof HTMLElement) {
      setPos(e.target.getBoundingClientRect());
    }
    childEle.props?.onMouseEnter?.(e);
  };

  useLayoutEffect(() => {
    if (open !== undefined && parent.current) {
      setPos(parent.current.getBoundingClientRect());
    } else {
      setPos(null);
    }
  }, [open, parent]);
  const onMouseLeave: MouseEventHandler<HTMLElement> = (e) => {
    if (open == undefined) {
      setPos(null);
    }
    childEle.props?.onMouseLeave?.(e);
  };
  const onMouseMove: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target instanceof HTMLElement && follow) {
      const targetRect = e.target.getBoundingClientRect();

      setPos({
        width: targetRect.width,
        bottom: targetRect.bottom,
        right: targetRect.right,
        height: targetRect.height,
        top: targetRect.top,
        left: targetRect.left,
        x: e.pageX,
        y: e.pageY,
      });
    }
    childEle.props?.onMouseMove?.(e);
  };

  useLayoutEffect(() => {
    if (!ref.current) return;
    if (pos) {
      const styles = getPos[follow ? 'follow' : position](
        pos,
        ref.current.getBoundingClientRect(),
      );
      if (styles.transform) {
        ref.current.style.setProperty('transform', styles.transform);
      }

      if (styles.top) ref.current.style.setProperty('top', String(styles.top));
      if (styles.left)
        ref.current.style.setProperty('left', String(styles.left));
      if (styles.right)
        ref.current.style.setProperty('right', String(styles.right));
      if (styles.bottom)
        ref.current.style.setProperty('bottom', String(styles.bottom));
    }
  }, [pos, position, follow]);

  return (
    <>
      {React.cloneElement(childEle, {
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        ref: parent,
      })}
      {pos &&
        title &&
        createPortal(
          <div ref={ref} className='tooltip'>
            {title}
          </div>,
          document.body,
        )}
    </>
  );
}

export default Tooltip;
