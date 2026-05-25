import { ModalProps } from './modal.types';
import './Modal.css';
import ReactDOM from 'react-dom';
import { useEffect, useId, useRef } from 'react';
import { getCurrentElementIndex, isHTMLElement } from './modal.utils';

const focusableSelector = `a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), *[tabindex]:not([tabindex="-1"])`;

function Modal({
  onClose,
  open,
  title,
  children,
  closeOnOutsideClick = true,
}: ModalProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);
  const focusIndex = useRef<number>(0);
  const activeElement = useRef<HTMLElement | null>(null); //restores focus to element which triggered modal

  useEffect(() => {
    // make html un-scrollable if modal is open
    if (!open) return;
    const htmlElement = document.querySelector('html');
    let prevValue: string | undefined;
    if (htmlElement) {
      prevValue = htmlElement.style.overflow;
      htmlElement.style.overflow = 'hidden';
    }
    return () => {
      if (prevValue != undefined && htmlElement)
        htmlElement.style.overflow = prevValue;
    };
  }, [open]);

  useEffect(() => {
    // bring first element into focus when modal opens
    if (!open) return;

    if (!ref.current) return;
    const elements = ref.current.querySelectorAll(focusableSelector);
    if (document.activeElement instanceof HTMLElement) {
      activeElement.current = document.activeElement;
    }
    if (elements.length > 0) {
      const firstElement = elements[0];
      if (firstElement instanceof HTMLElement) {
        firstElement.focus();
      }
    }
    return () => {
      if (activeElement.current) {
        activeElement.current?.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (!ref.current) return;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        // close modal on escape
      } else if (e.key === 'Tab') {
        if (!ref.current) return;
        if (e.shiftKey) {
          // focus prev element
          e.preventDefault();
          // we select elements on event handler because we have updated focusable element ( inner content of modal is user-dependent )
          const elements = ref.current.querySelectorAll(focusableSelector);
          focusIndex.current--;
          focusIndex.current =
            (focusIndex.current + elements.length) % elements.length;
          const ele = elements[focusIndex.current];
          if (isHTMLElement(ele)) {
            ele.focus();
          }
        } else {
          // focus next element
          e.preventDefault();
          const elements = ref.current.querySelectorAll(focusableSelector);
          focusIndex.current++;
          focusIndex.current = focusIndex.current % elements.length;
          const ele = elements[focusIndex.current];
          if (isHTMLElement(ele)) {
            ele.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const focusHandler = (e: FocusEvent) => {
      if (!ref.current) return;
      const elements = ref.current.querySelectorAll(focusableSelector);
      // when any element focuses, either manually or via tab/shift+tab, we update the index of that element
      // because, if any element is manually focused, we want to continue from that point onwards
      if (e.target instanceof HTMLElement) {
        const elementIndex = getCurrentElementIndex(elements, e.target);
        focusIndex.current = elementIndex;
      }
    };
    // we used focusin because that is can bubble up
    // normal focus event do not bubble
    // here we are kind of using event delegation
    document.addEventListener('focusin', focusHandler);
    return () => {
      document.removeEventListener('focusin', focusHandler);
    };
  }, [open]);
  if (open == false) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className='overlay'
        onClick={closeOnOutsideClick ? () => onClose() : undefined}
      />
      <div
        className='modal'
        ref={ref}
        role='dialog'
        aria-modal='true'
        aria-labelledby={id}
      >
        <div className='modal-header'>
          <h3 id={id}>{title}</h3>
          <button onClick={onClose} aria-label='Close modal'>
            X
          </button>
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </>,
    document.body,
  );
}

export default Modal;
