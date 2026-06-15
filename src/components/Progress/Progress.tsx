import { ProgressProps } from './progress.types';
import './progress.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

function Progress({
  duration, // run progress for this much amount
  onComplete,
  showProgress, // whether to show progress in middle
  value, // controlled component by parent
  start = true, // whether to start progress or not. only for auto-progress
  label,
}: ProgressProps) {
  const [filled, setFilled] = useState(0); // overall progress
  const totalTime = useRef(0); // to store elapsed time
  const timerRef = useRef<null | number>(null); // to store interval ref
  const filledVal = value === undefined ? filled : Math.min(value, 1); // undefined value means progress is controlled by us
  const onCompleteRef = useRef(onComplete); // to store fn reference

  useLayoutEffect(() => {
    // updating ref to store latest fn reference
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // this is forbidden operation so throw error
    if (duration !== undefined && value !== undefined) {
      throw new Error('you are using controlled mode with auto duration mode');
    }
  }, [duration, value]);

  useEffect(() => {
    if (duration === undefined || !start) return; // do not start if there is no duration or it is not started yet

    totalTime.current = 0; //reset stored time
    timerRef.current = setInterval(() => {
      totalTime.current += 100; // we update progress at every 100ms, so accumulate 100ms
      setFilled(Math.min(totalTime.current / duration, 1)); //we store progress between 0 to 1, where 1 is max(100%)
      if (totalTime.current >= duration) {
        // if time limit has been exceed then clear the interval
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }
    }, 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [duration, start]);

  useEffect(() => {
    // call onComplete when progress is 100%
    if (filledVal === 1) onCompleteRef.current?.();
  }, [filledVal]);

  return (
    <div
      className='outer'
      role='progressbar'
      aria-label={label || 'progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={filledVal * 100}
    >
      <span className='perc'>
        {showProgress && `${(filledVal * 100).toFixed(0)}%`}
      </span>
      <div className='inner' style={{ transform: `scaleX(${filledVal})` }} />
    </div>
  );
}

export default Progress;
