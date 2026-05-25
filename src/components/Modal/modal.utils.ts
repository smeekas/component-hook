export function getCurrentElementIndex(
  elements: NodeListOf<Element>,
  currElement: Element | null,
) {
  const index = [...elements].findIndex((ele) => ele === currElement);
  return index;
}

export const isHTMLElement = (element: Element): element is HTMLElement => {
  return element instanceof HTMLElement;
};
