export function getHighlightedText(searchStr: string, label: string) {
  const startIndex = label.toLowerCase().indexOf(searchStr.toLowerCase());
  if (startIndex === -1) {
    return {
      start: label,
      highlighted: '',
      end: '',
    };
  }
  return {
    start: label.substring(0, startIndex),
    highlighted: label.toLowerCase().includes(searchStr.toLowerCase())
      ? label.substring(startIndex, startIndex + searchStr.length)
      : '',
    end: label.substring(startIndex + searchStr.length),
  };
}
