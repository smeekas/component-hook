import {
  KeyboardEventHandler,
  MouseEventHandler,
  TouchEventHandler,
  useMemo,
  useState,
} from 'react';
import { Cell } from './SelectableGrid.types';

type SelectableGridProps = {
  rows: number;
  columns: number;
};

function SelectableGrid({ columns, rows }: SelectableGridProps) {
  const [start, setStart] = useState<Cell | null>(null);
  const [current, setCurrent] = useState<Cell | null>(null);
  const [focusedCell, setFocusedCell] = useState<Cell | null>({
    row: 0,
    col: 0,
  });
  const [shouldMouseCapture, setShouldMouseCapture] = useState(false);
  const rowArr = useMemo(() => Array(rows).fill(null), [rows]);
  const colArr = useMemo(() => Array(columns).fill(null), [columns]);

  const onMouseDown: MouseEventHandler<HTMLElement> = (e) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      const { dataset } = target;
      const row = dataset.row;
      const col = dataset.col;
      if (row !== undefined && col !== undefined)
        setStart({ row: +row, col: +col });
      setCurrent(null);
      setShouldMouseCapture(true);
    }
  };

  const onTouchDown: TouchEventHandler<HTMLElement> = (e) => {
    const { target } = e;
    e.preventDefault();

    if (target instanceof HTMLElement) {
      const { dataset } = target;
      const row = dataset.row;
      const col = dataset.col;

      if (row !== undefined && col !== undefined)
        setStart({ row: +row, col: +col });
      setCurrent(null);
      setShouldMouseCapture(true);
    }
  };

  const onMouseMove: MouseEventHandler<HTMLElement> = (e) => {
    if (!shouldMouseCapture) return;
    const { target } = e;
    if (target instanceof HTMLElement) {
      const { dataset } = target;
      const row = dataset.row;
      const col = dataset.col;
      if (row !== undefined && col !== undefined)
        setCurrent({ row: +row, col: +col });
    }
  };

  const onTouchMove: TouchEventHandler<HTMLElement> = (e) => {
    if (!shouldMouseCapture) return;
    const target = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );

    if (target instanceof HTMLElement) {
      const { dataset } = target;
      console.log(dataset);
      const row = dataset.row;
      const col = dataset.col;
      if (row !== undefined && col !== undefined)
        setCurrent({ row: +row, col: +col });
    }
  };

  const handleCell: KeyboardEventHandler<HTMLElement> = (e) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      const { dataset } = target;
      const row = dataset.row;
      const col = dataset.col;
      if (row !== undefined && col !== undefined) {
        if (!start) {
          setStart({ row: +row, col: +col });
          setCurrent(null);
        } else {
          setCurrent({ row: +row, col: +col });
        }
      }
    }
  };

  const handleFocusCell = (row: number, col: number) => {
    setFocusedCell({ row, col });
    const ele = document.querySelector(
      `div[data-row="${row}"][data-col="${col}"]`
    );
    if (ele && ele instanceof HTMLElement) ele.focus();
  };
  const onKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
    switch (e.key) {
      case 'ArrowRight': {
        if (focusedCell) {
          handleFocusCell(
            focusedCell.row,
            Math.min(columns - 1, focusedCell.col + 1)
          );
        }
        break;
      }
      case 'ArrowLeft': {
        if (focusedCell) {
          handleFocusCell(focusedCell.row, Math.max(0, focusedCell.col - 1));
        }
        break;
      }
      case 'ArrowUp': {
        if (focusedCell) {
          handleFocusCell(Math.max(0, focusedCell.row - 1), focusedCell.col);
        }
        break;
      }
      case 'ArrowDown': {
        if (focusedCell) {
          handleFocusCell(
            Math.min(rows - 1, focusedCell.row + 1),
            focusedCell.col
          );
        }
        break;
      }
      case 'Enter': {
        handleCell(e);
        break;
      }
      case 'Escape': {
        setStart(null);
        setCurrent(null);
        break;
      }
    }
  };

  function getScreenReaderDescription() {
    if (!start || !current) return;
    return `Selected area from cell ${start.row}x${start.col} to cell ${current.row}x${current.col}`;
  }
  return (
    <div
      role='grid'
      onMouseDown={onMouseDown}
      onTouchStart={onTouchDown}
      aria-label='Selectable cell grid'
      aria-keyshortcuts='ArrowRight ArrowLeft ArrowUp ArrowDown Enter Escape'
      tabIndex={0}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onKeyDown={onKeyDown}
      aria-multiselectable={true}
      onMouseUp={() => setShouldMouseCapture(false)}
      style={{ touchAction: 'none' }}
    >
      <div className='screen-reader' aria-live='polite'>
        {' '}
        {getScreenReaderDescription()}
      </div>
      {rowArr.map((_, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className='border-collapse flex '
            role='row'
            aria-rowindex={rowIndex}
          >
            {colArr.map((_, colIndex) => {
              const isActiveX =
                start &&
                current &&
                ((start.row <= rowIndex && rowIndex <= current.row) ||
                  (current.row <= rowIndex && rowIndex <= start.row));
              const isActiveY =
                start &&
                current &&
                ((start.col <= colIndex && colIndex <= current.col) ||
                  (current.col <= colIndex && colIndex <= start.col));

              const isActive = isActiveX && isActiveY;
              const isFocused =
                focusedCell?.row === rowIndex && focusedCell.col == colIndex;
              return (
                <div
                  data-row={rowIndex}
                  data-col={colIndex}
                  key={colIndex}
                  aria-colindex={colIndex}
                  aria-selected={!!isActive}
                  role='gridcell'
                  tabIndex={isFocused ? 0 : -1}
                  style={{ borderWidth: '1px' }}
                  className={`border-black border-solid  w-15 h-15 border-collapse focus:bg-blue-50 ${
                    isActive && 'bg-blue-300'
                  }`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default SelectableGrid;
