import { createContext, useContext } from 'react';
import { AccordionItemContext } from './Accordion.types';

const accordionItemContext = createContext<null | AccordionItemContext>(null);

export const AccordionItemProvider = accordionItemContext.Provider;
export const useAccordionItemContext = () => {
  const contextValue = useContext(accordionItemContext);
  if (contextValue) return contextValue;
  throw Error('context is null');
};
