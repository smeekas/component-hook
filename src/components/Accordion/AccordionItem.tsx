import { ReactNode, useId } from 'react';
import './accordion.css';
import { AccordionItemProvider } from './AccordionItemContext';
type AccordionItemProps = {
  children: ReactNode;
  value: string;
  disabled?: boolean;
};
function AccordionItem({
  children,
  value,
  disabled = false,
}: AccordionItemProps) {
  const id = useId();
  return (
    // accordion item context manages accordion item level data
    // id, disabled etc...
    // this way control,panel component will be able to access id as Item is parent component (item context wrapper)
    <AccordionItemProvider value={{ id: value, disabled, componentId: id }}>
      <div className='item'>{children}</div>
    </AccordionItemProvider>
  );
}

export default AccordionItem;
