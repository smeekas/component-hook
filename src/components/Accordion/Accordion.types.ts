export type AccordionContext = {
  open: string | null;
  onChange: (newId: string) => void;
};
export type AccordionItemContext = {
  id: string;
  disabled?: boolean;
  componentId: string;
};
