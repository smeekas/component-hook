import { useEffect, useRef } from 'react';
import DigitStrip from './DigitStrip';
import { CommonTickerProps } from './SlotNumber.types';
import styles from './SlotNumberAnimation.module.css';

type SlotNumberAnimationProps = {
  value: number;
} & CommonTickerProps;

function SlotNumberAnimation({ value, ...rest }: SlotNumberAnimationProps) {
  const formatter = new Intl.NumberFormat(undefined, { currency: 'USD' });
  const str = formatter.format(value);
  const currValue = useRef(value); // ref to store prev value
  useEffect(() => {
    currValue.current = value;
  }, [value]);
  const isIncreasing = value > currValue.current; // for CSS color
  const isDecreasing = value < currValue.current; // for CSS color

  const valueLen = str.length;
  return (
    <div className={styles.slots}>
      {Array.from({ length: valueLen }).map((_, index) => {
        // for every number, we render entire 0-9 number vertical strip
        // if number is 5 then we position strip in a way that 5 is visible
        return (
          <DigitStrip
            isIncreasing={isIncreasing}
            isDecreasing={isDecreasing}
            value={str[index]}
            key={index}
            {...rest}
          />
        );
      })}
    </div>
  );
}

export default SlotNumberAnimation;
