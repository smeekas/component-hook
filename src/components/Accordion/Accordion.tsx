import { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { AccordionContext } from './Accordion.types';
import { AccordionProvider } from './AccordionContext';
import AccordionControl from './AccordionControl';
import AccordionPanel from './AccordionPanel';
import AccordionItem from './AccordionItem';

type AccordionProps = Partial<AccordionContext> & {
  children: ReactNode;
  defaultOpen?: string;
};
function Accordion({ children, ...rest }: AccordionProps) {
  const [open, setOpen] = useState<null | string>(rest.defaultOpen || null);

  const propOnChange = useRef(rest.onChange);
  const onChange = useCallback(
    (newId: string) => {
      if (propOnChange.current) {
        propOnChange.current(newId);
      }
      setOpen((prev) => (newId === prev ? null : newId));
    },
    [propOnChange],
  );
  const propOpen = rest.open ?? null;
  const memoizedValue = useMemo<AccordionContext>(() => {
    // if user provides props and make it controlled component, use that only
    // else use internal state
    return { open: propOpen ?? open, onChange };
  }, [onChange, open, propOpen]);

  /*
  accordion context manages accordion level data
  defaultOpen, managing open state etc...
   */
  return (
    <AccordionProvider value={memoizedValue}>{children}</AccordionProvider>
  );
}
Accordion.Control = AccordionControl;
Accordion.Panel = AccordionPanel;
Accordion.Item = AccordionItem;

export default Accordion;
