import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Progress from './Progress';

type PausableThrottledProgressProps = {
  max?: number;
};

const PROGRESS_DURATION = 3000;
function PausableThrottledProgress({
  max = 1, //max number of progress bars that runs in parallel
}: PausableThrottledProgressProps) {
  // progress bar demo with pause, resume support
  // it can support dynamic sized progress bars
  const [bars, setBars] = useState<number[]>([]);
  const ref = useRef<null | number>(null); // stores timer
  const started = useRef<boolean>(false); // stores whether it is started or paused

  const onStart = () => {
    if (started.current) return;
    started.current = true; // mark that interval is started
    ref.current = setInterval(() => {
      // we update progress  at every 100ms
      setBars((prev) => {
        const firstNonFullIndex = prev.findIndex((item) => item !== 1); // find index where progress bar is not filled
        if (firstNonFullIndex === -1) return prev; // all are filled

        return prev.map((item, index) => {
          if (index >= firstNonFullIndex && index < firstNonFullIndex + max) {
            // if current bar is under the limit then update the progress
            //  PROGRESS_DURATION => 1 then 100 means? ==>100*1/PROGRESS_DURATION
            // 100ms means 100/PROGRESS_DURATION progress on scale 0-1
            return Math.min(1, item + 100 / PROGRESS_DURATION);
          }
          return item;
        });
      });
    }, 100);
  };
  const clear = useCallback(() => {
    // function that clears interval, start flag and timer ref
    if (ref.current) {
      clearInterval(ref.current);
      started.current = false;
      ref.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clear();
      // cleanup function
    };
  }, [clear]);
  
  const onPause = () => {
    // pause is just like clear
    clear();
  };
  useEffect(() => {
    if (bars.every((item) => item >= 1) && ref.current) {
      // interval will continue forever, instead clear timer and interval when all bars are filled
      clear();
    }
  }, [bars, clear]);
  return (
    <div>
      <div>Pausable Throttle Demo max: {max}</div>
      <button onClick={() => setBars((prev) => [...prev, 0])}>add</button>
      <button onClick={onStart}>start</button>
      <button onClick={onPause}>pause</button>
      {bars.map((item, index) => {
        return <Progress value={item} key={index} />;
      })}
    </div>
  );
}

export default memo(PausableThrottledProgress);
