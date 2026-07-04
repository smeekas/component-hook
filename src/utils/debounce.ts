/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300,
) {
  let timer: null | number = null;
  return (...arg: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arg);
    }, delay);
  };
}
