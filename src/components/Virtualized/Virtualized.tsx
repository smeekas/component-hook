import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { VirtualizedProps } from './Virtualized.types';
import styles from './Virtualized.module.css';

function Virtualized<T>({
  children,
  list,
  size,
  overScan = 3,
  horizontal,
}: VirtualizedProps<T>) {
  const containerSize = list.length * size; // variable that gives container height
  const [height, setHeight] = useState(0); // height of parent element, used for element calculation
  const parentRef = useRef<null | HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  useLayoutEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      if (horizontal) {
        setHeight(rect.width);
      } else {
        setHeight(rect.height);
      }
    }
  }, [horizontal]);

  useEffect(() => {
    const rb = new ResizeObserver((e) => {
      const ele = e[0];
      if (horizontal) {
        setHeight(ele.contentRect.width);
      } else {
        setHeight(ele.contentRect.height);
      }
    });
    const element = parentRef.current;
    if (element) rb.observe(element);

    return () => {
      if (element) rb.unobserve(element);
    };
  }, [horizontal]);
  const visible = Math.ceil(height / size) + 1; // total visible element at a time. ceil because we want to show one extra in case of fractions
  // we want to show one more element so +1. reason: height=400, size=40, visible=10, user scrolls 20px. bottom is empty in case of overScan=0
  const prev = Math.floor(top / size); // number of scrolled elements.
  /**
   * Floor because we want to hide less elements
   * for ex. top=40, size=4 => prev=>10 scrolled elements
   * top=42, size=4 => prev=>10.5 => 10 scrolled elements
   */
  const start = prev; //start from this index
  const prevScanStart = start - overScan; // in case of overScan, from where we should show prev element. total overScan amount of elements

  const rangeStart = start < overScan ? 0 : prevScanStart;
  // const sliced = list.slice(start, start + visible); // we will show elements from  start to start+visible. SIMPLER for interview

  // const overScanStart = start + visible; // in case of overScan, how many more elements we should show
  // const overScanned = list.slice(overScanStart, overScanStart + overScan); // we will show overScan amount of hidden elements

  // const prevScanned = start < overScan ? [] : list.slice(prevScanStart, start); // we will show overScan amount of prev hidden elements
  // if start< overScan, no need of prev elements
  // else, we show elements from start - overScan  to start

  const singleList = list.slice(rangeStart, start + visible + overScan);
  const onScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      // on scroll set target top
      const target = e.nativeEvent.target;
      if (target instanceof HTMLElement) {
        if (horizontal) {
          setTop(target.scrollLeft);
        } else {
          setTop(target.scrollTop);
        }
      }
    },
    [horizontal],
  );
  const containerStyle: CSSProperties = {};

  if (horizontal) {
    containerStyle.width = `${containerSize}px`;
  } else {
    containerStyle.height = `${containerSize}px`;
  }
  function getElementStyle(index: number, start: number): CSSProperties {
    if (horizontal) {
      return {
        width: `${size}px`,
        transform: `translateX(${size * (index + start)}px)`,
      };
    }
    // element should be translated by some amount
    // if index is 0 then no need to move
    // else we need to move by (prev number of element * size) amount
    // here index is of original list. since we render part of list, we need start variable
    // start stands for from where we are rendering list
    return {
      height: `${size}px`,
      transform: `translateY(${size * (index + start)}px)`,
    };
  }

  // simpler approach is to render three list, prevOverScan, main, overScan list
  return (
    // wrapper that makes overflow hidden and sets top on scroll
    <div className={styles.wrapper} ref={parentRef} onScroll={onScroll}>
      {/* from Interview POV
        wrapper is that makes overflow:scroll
        for wider support, wrapper is of same height as parent
        container contains all elements and is fully visible and is of size totalElement*elementSize
      */}
      {/* container that contains all the elements and is not hidden */}
      <div className={styles.container} style={containerStyle}>
        {singleList.map((listItem, index) => (
          // render visible list
          // our start variable is of not main list's start but prevOverScanned's start
          // this will render prev element outside of current viewport as well as start is of prevOverScan
          <div
            style={getElementStyle(index, rangeStart)}
            key={index + rangeStart}
            className={styles.listitem}
          >
            {children({ item: listItem, index: index + rangeStart })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Virtualized;
