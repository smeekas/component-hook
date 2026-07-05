/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300,
) {
  let timer: null | number = null;
  function debounced(...arg: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arg);
    }, delay);
  }
  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
  };
  return debounced;
}
