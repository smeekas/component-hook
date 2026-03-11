import React, {
  ClipboardEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';
import { OTPProps } from './OTP.types';
import styles from './OTP.module.css';

function OTP({ length, separator }: OTPProps) {
  // length
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const onPaste: ClipboardEventHandler<HTMLDivElement> = (e) => {
    const otp = e.clipboardData.getData('text').trim().slice(0, length);

    setValue(String(otp).split(''));

    e.preventDefault();
  };
  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };
  const selectInput = (index: number) => {
    const targetInput = inputRefs.current[index];
    targetInput.select();
  };
  const onChange: React.FormEventHandler<HTMLElement> = (e) => {
    const element = e.target;
    if (element instanceof HTMLInputElement) {
      const index = element.dataset.index;
      if (!index) return;
      const numericIndex = +index;
      if (isNaN(numericIndex)) return;

      setValue((prev) => {
        const newValue = [...prev];
        newValue[numericIndex] = element.value.charAt(element.value.length - 1); // in case of multiple char in single ele
        return newValue;
      });
      const newIndex = Math.min(numericIndex + 1, length - 1);
      focusInput(newIndex);
      selectInput(newIndex);
    }
  };
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const element = e.target;
    if (element instanceof HTMLInputElement) {
      const index = element.dataset.index;
      if (!index) return;
      const numericIndex = +index;
      if (e.key === 'ArrowLeft') {
        const newIndex = Math.max(0, numericIndex - 1);
        focusInput(newIndex);
        selectInput(newIndex);
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        const newIndex = Math.min(numericIndex + 1, length - 1);
        focusInput(newIndex);
        selectInput(newIndex);
        e.preventDefault();
      } else if (e.key === 'Backspace') {
        const newIndex = Math.max(0, numericIndex - 1);
        focusInput(newIndex);
        selectInput(newIndex);
        setValue((prev) => {
          const newValue = [...prev];
          newValue[numericIndex] = '';
          return newValue;
        });
        e.preventDefault();
      }
    }
  };
  return (
    <div className={styles.otpContainer} onPaste={onPaste} onChange={onChange}>
      {Array.from({ length }).map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={(ref) => {
                inputRefs.current[index] = ref!;
              }}
              aria-label={`Digit ${index + 1} of OTP`}
              data-index={index}
              onKeyDown={onKeyDown}
              value={value?.[index]}
              onClick={(e) => (e.target as HTMLInputElement).select()}
              min={0}
              type='text'
            />
            {index !== length - 1 && <div>{separator}</div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default OTP;
