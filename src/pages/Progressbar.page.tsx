import { useEffect, useRef, useState } from 'react';
import Progress from '../components/Progress/Progress';
import ThrottleProgress from '../components/Progress/ThrottleProgress';
import PausableThrottledProgress from '../components/Progress/PausableThrottledProgress';

export function ProgressBarPage() {
  const [val, setVal] = useState(0);
  const count = useRef<number>(0);
  useEffect(() => {
    const ref = setInterval(() => {
      setVal((prev) => prev + 0.01);
      count.current++;
      if (count.current * 0.01 === 1) clearInterval(ref);
    }, 100);
    return () => {
      clearInterval(ref);
    };
  }, []);
  return (
    <>
      <Progress duration={4000} showProgress />
      <Progress value={val} showProgress />
      <div className='flex fd-row mt-8'>
        <ThrottleProgress max={2} />
        <PausableThrottledProgress max={2} />
      </div>
    </>
  );
}
