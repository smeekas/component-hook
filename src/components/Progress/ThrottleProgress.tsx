import { memo, useCallback, useState } from 'react';
import Progress from './Progress';

type ThrottleProgressProps = {
  max?: number;
};

function ThrottleProgress({ max = 1 }: ThrottleProgressProps) {
  // this is demo of that I can build throttlable Progress
  // so max limit is for demo purpose
  // 2000ms progress is for demo purpose
  // auto-updated progressbars
  // pause, resume is not supported
  const [total, setTotal] = useState(0); // stores total bars
  const [start, setStart] = useState(max); // stores max limit (max-progressbar that can run in parallel)
  // progress bar can fill only if it's index is < start otherwise it cannot
  const onComplete = useCallback(() => setStart((prev) => prev + 1), []);
  // if one progress bar is filled then update the start so that next progressbar can start

  return (
    <div className='mt-8' style={{ height: '400px' }}>
      <div>
        <div>Throttle Demo max: {max} (fixed duration)</div>
        <button onClick={() => setTotal((prev) => prev + 1)}>add</button>
      </div>
      <div>
        {Array.from({ length: total }).map((_, index) => {
          return (
            <div key={index} className='mt-8'>
              <Progress
                duration={2000} // to store dynamic durationed progressbars, we can store duration in ref or we can take array instead of total variable
                start={index < start}
                onComplete={onComplete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(ThrottleProgress);
