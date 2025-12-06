import { useState } from 'react';
import NumberAnimation from '../components/NumberAnimation/NumberAnimation';

export function NumberAnimationPage() {
  const [num, setNum] = useState(10);
  const onClick = () => {
    setNum(Math.ceil(Math.random() * 1000));
  };
  return (
    <div className='flex flex-col'>
      <NumberAnimation num={num} duration={500} />
      <div>
        <button onClick={onClick}>change</button>
      </div>
    </div>
  );
}
