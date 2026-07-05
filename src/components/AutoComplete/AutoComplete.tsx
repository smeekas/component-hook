import {
  KeyboardEventHandler,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import './AutoComplete.css';
import { AutoCompleteProps } from './AutoComplete.types';
import { debounce } from '../../utils/debounce';
import { getHighlightedText } from './autoComplete.utils';
import useClickToOutside from '../../hooks/useClickToOutside';

function AutoComplete({
  options,
  onSearch,
  onSelect,
  getOptionLabel,
}: AutoCompleteProps) {
  const [focused, setFocused] = useState(false); // for dropdown open/close state

  const componentId = useId();
  const cid = componentId.replaceAll(':', '-');
  const [searchStr, setSearchStr] = useState(''); // what we have searched. useful state fo highlighting option and to show selected option
  const dropdownRef = useRef<null | HTMLUListElement>(null); // for selecting child option for focus
  const inputRef = useRef<null | HTMLInputElement>(null); //to blur input
  const [highlightedEle, setHighlightedEle] = useState<null | number>(null); // highlighted element index
  const onSearchMemoized = useMemo(
    () => (onSearch ? debounce(onSearch, 400) : undefined),
    [onSearch],
  );

  useEffect(() => {
    return () => {
      onSearchMemoized?.cancel();
    };
  }, []);
  const isValid = (
    index: number | null | undefined,
    length: number,
  ): index is number => {
    return typeof index === 'number' && index >= 0 && index < length;
  };

  useEffect(() => {
    if (isValid(highlightedEle, options.length)) {
      // when highlighted element changes, bring it in viewport
      const ele = dropdownRef.current?.querySelector(
        `#${cid}-${options[highlightedEle].value}`,
      );
      if (ele) {
        // nearest helps in making element visible in bottom
        // otherwise scrollIntoView will bring it at very top in scroll-container
        ele.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [cid, highlightedEle, options]);

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    // a11y
    switch (e.key) {
      case 'ArrowUp': {
        if (options.length > 0)
          setHighlightedEle((prev) =>
            //if no highlighted then set last else prev
            prev === null ? options.length - 1 : Math.max(0, prev - 1),
          );
        break;
      }
      case 'ArrowDown': {
        if (options.length > 0)
          setHighlightedEle((prev) =>
            // if no highlighted set then highlight first else next
            prev === null ? 0 : Math.min(options.length - 1, prev + 1),
          );
        break;
      }
      case 'Enter': {
        if (isValid(highlightedEle, options.length)) {
          onSelectOption(
            options[highlightedEle].value,
            options[highlightedEle],
          );
        }
        break;
      }
      case 'Escape': {
        inputRef.current?.blur();
        break;
      }
    }
  };
  const onSelectOption = (
    ...args: Parameters<NonNullable<AutoCompleteProps['onSelect']>>
  ) => {
    // call parent's onSelect
    onSelect?.(...args);
    const option = args[1];
    if (typeof option.label === 'string') {
      setSearchStr(option.label); //set label of selected option
    } else if (getOptionLabel) {
      // if label is not string and function available, call it to get label for selected option
      setSearchStr(getOptionLabel(option));
    }
    // on select, hide the dropdown as well
    setFocused(false);
  };

  const containerRef = useClickToOutside<HTMLDivElement>({
    onOutsideClick() {
      setFocused(false);
    },
    enabled: focused,
  });

  return (
    <div className='autocomplete' ref={containerRef}>
      <input
        placeholder='search'
        className='input'
        value={searchStr}
        ref={inputRef}
        role='combobox' //a11y
        aria-haspopup='listbox' //a11y // what kind of popup
        aria-expanded={focused} //a11y
        aria-activedescendant={
          //a11y
          isValid(highlightedEle, options.length)
            ? `${cid}-${options[highlightedEle].value}`
            : undefined
        }
        aria-autocomplete='list' // if we can select something from list and it will be selected
        aria-controls={`${cid}-list`} //controlled dropdown list
        onChange={(e) => {
          setHighlightedEle(null);
          onSearchMemoized?.(e.target.value);
          setSearchStr(e.target.value);
        }}
        onKeyDown={onKeyDown}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
      />
      {focused && (
        <ul
          className='suggestion'
          ref={dropdownRef}
          id={`${cid}-list`}
          role='listbox'
        >
          {options.length > 0 ? (
            options.map((opItem, index) => {
              let label = opItem.label;
              if (typeof opItem.label === 'string') {
                const highlighted = getHighlightedText(searchStr, opItem.label);
                label = (
                  <span>
                    <span>{highlighted.start}</span>
                    <span className='highlighted'>
                      {highlighted.highlighted}
                    </span>
                    <span>{highlighted.end}</span>
                  </span>
                );
              }
              return (
                <li
                  key={opItem.value}
                  className={`list-item ${highlightedEle === index ? 'highlight' : ''}`}
                  data-index={index}
                  role='option'
                  aria-selected={highlightedEle === index}
                  id={`${cid}-${opItem.value}`}
                  onClick={() => {
                    onSelectOption(opItem.value, opItem);
                  }}
                  onPointerDown={(e) => e.preventDefault()}
                  // above will help in selecting via mouse as it also triggers blur of input
                >
                  {label}
                </li>
              );
            })
          ) : (
            <div className='empty'>no data</div>
          )}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
