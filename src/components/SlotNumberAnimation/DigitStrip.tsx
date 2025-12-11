import { useLayoutEffect, useRef, useState } from 'react';
import { CommonTickerProps } from './SlotNumber.types';
import styles from './SlotNumberAnimation.module.css';
type DigitStripProps = {
  value: string;
  isIncreasing: boolean;
  isDecreasing: boolean;
};
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const SEPARATORS = [',', '.', '-'];

/**
 * @description  Entire vertical digit strip
 */
function DigitStrip({
  value,
  fontSize,
  isIncreasing,
  isDecreasing,
  animationDuration = 1,
}: DigitStripProps & CommonTickerProps) {
  const ref = useRef<null | ReturnType<typeof setTimeout>>(null);
  const [className, setClassName] = useState(() => {
    if (isIncreasing) return styles.increasing;
    if (isDecreasing) return styles.decreasing;
  });
  useLayoutEffect(() => {
    // set class for green/red styling appropriately.
    if (isIncreasing) setClassName(styles.increasing);
    else if (isDecreasing) setClassName(styles.decreasing);
    // debounce it as well. debounce clearing class name for given animation duration
    ref.current = setTimeout(() => {
      if (ref.current) clearTimeout(ref.current);
      setClassName('');
    }, animationDuration * 1000);
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, [isIncreasing, isDecreasing, animationDuration]);

  const stripContainerStyles: React.CSSProperties = { height: `${fontSize}px` };
  const isSeparator = SEPARATORS.includes(value);
  const stripInnerStyles: React.CSSProperties = isSeparator
    ? {}
    : {
        transform: `translateY(-${fontSize * Number(value)}px)`,
        transitionDuration: `${animationDuration}s`,
      };
  const digitStyles: React.CSSProperties = {
    fontSize: `${fontSize}px`,
  };
  return (
    // just a container that has height of font size and hides entire strip
    <div className={styles.strip} style={stripContainerStyles}>
      {/* strip Inner div shows entire vertical strip + it translate strip to show given number */}
      <div className={styles.stripInner} style={stripInnerStyles}>
        {isSeparator ? (
          <span style={digitStyles} className={`${styles.digit} ${className}`}>
            {value}
          </span>
        ) : (
          DIGITS.map((digit) => {
            return (
              <span
                style={digitStyles}
                className={`${styles.digit} ${className}`}
              >
                {digit}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DigitStrip;
