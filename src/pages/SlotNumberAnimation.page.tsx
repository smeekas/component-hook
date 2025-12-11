import { useState } from 'react';
import SlotNumberAnimation from '../components/SlotNumberAnimation/SlotNumberAnimation';

export function SlotNumberAnimationPage() {
  const [val, setVal] = useState(500.12);

  const onChange = () => {
    setVal(Number((Math.random() * 10000).toFixed(2)));
  };
  return (
    <>
      <div className='mb-10'>
        <button onClick={onChange}>change</button>
      </div>
      <SlotNumberAnimation value={val} fontSize={60} animationDuration={1} />
    </>
  );
}
