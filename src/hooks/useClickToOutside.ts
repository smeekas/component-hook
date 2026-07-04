import { useEffect, useLayoutEffect, useRef } from 'react';

function useClickToOutside<T>({
  onOutsideClick,
  enabled,
}: {
  onOutsideClick: () => void;
  enabled: boolean;
}) {
  const ref = useRef<T>(null);
  const clickRef = useRef(onOutsideClick);
  useLayoutEffect(() => {
    clickRef.current = onOutsideClick;
  }, [onOutsideClick]);
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        ref.current &&
        ref.current instanceof HTMLElement &&
        enabled
      ) {
        const inside = ref.current.contains(e.target);
        console.log(
          '[hook] pointerdown. inside container?',
          inside,
          'target=',
          e.target,
          'container=',
          ref.current,
        );
        if (!inside) {
          clickRef.current();
        }
      }
    };
    if (enabled) document.addEventListener('pointerdown', clickHandler);
    return () => {
      document.removeEventListener('pointerdown', clickHandler);
    };
  }, [enabled]);
  return ref;
}

export default useClickToOutside;
