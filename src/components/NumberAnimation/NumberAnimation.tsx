import { useEffect, useRef, useState } from 'react';

type NumberAnimationProps = {
  num: number;
  duration?: number;
};

function NumberAnimation({ num, duration = 1000 }: NumberAnimationProps) {
  const [currNumber, setCurrentNumber] = useState(num);
  const currRef = useRef(currNumber);
  useEffect(() => {
    const curr = performance.now(); // current time-stamp
    const endTime = (curr || 0) + duration; // end time-stamp

    let start = curr;
    const diff = num - currRef.current; // difference between new number and current number
    function cb(time: number) {
      start = time;
      /**
       * time-curr ===current time-point in  duration between curr & time
       */
      const pc = (time - curr) / duration; // get it in %
      setCurrentNumber(currRef.current + diff * pc); // add % of diff to original value
      if (start > endTime) {
        // stop when time is over
        currRef.current = num;
      } else {
        // if time is not over request for frame again
        requestAnimationFrame(cb);
      }
    }
    requestAnimationFrame(cb);
  }, [duration, num]);
  return <h2>{currNumber.toFixed(0)}</h2>;
}

export default NumberAnimation;
