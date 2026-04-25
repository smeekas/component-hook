import { ReactNode } from 'react';
import './accordion.css';
import { useAccordion } from './AccordionContext';
import { useAccordionItemContext } from './AccordionItemContext';

type AccordionPanelProps = {
  children: ReactNode;
};
function AccordionPanel({ children }: AccordionPanelProps) {
  const { open } = useAccordion();
  const { id, componentId } = useAccordionItemContext();

  return (
    <div
      id={`${componentId}-panel`}
      className={`panel ${id === open ? 'visible' : 'not-visible'}`}
      aria-labelledby={`${componentId}-btn`}
    >
      <div className='panel-container'>{children}</div>
    </div>
  );
}

export default AccordionPanel;
