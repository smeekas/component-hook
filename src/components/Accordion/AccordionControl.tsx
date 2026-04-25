import { ReactNode } from 'react';
import { useAccordion } from './AccordionContext';
import './accordion.css';
import { useAccordionItemContext } from './AccordionItemContext';

type AccordionControlProps = {
  children: ReactNode;
};
function AccordionControl({ children }: AccordionControlProps) {
  const { onChange, open } = useAccordion();
  const { id, disabled, componentId } = useAccordionItemContext();
  return (
    <button
      onClick={() => {
        onChange(id);
      }}
      type='button'
      disabled={disabled}
      className='control'
      id={`${componentId}-btn`}
      aria-expanded={open === id}
      aria-controls={`${componentId}-panel`}
    >
      {children}
      <span className={`icon  ${id === open ? 'open' : 'close'}`}>{'>'}</span>
    </button>
  );
}

export default AccordionControl;
