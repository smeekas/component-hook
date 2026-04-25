import { createContext, useContext } from 'react';
import { AccordionContext } from './Accordion.types';

const accordionContext = createContext<AccordionContext | null>(null);
export const AccordionProvider = accordionContext.Provider;
export const useAccordion = () => {
  const contextValue = useContext(accordionContext);
  if (contextValue) return contextValue;
  throw Error('context is null');
};
