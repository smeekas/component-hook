import { GridLightCellProps } from './gridLights.types';

function GridCell({ show, onClick, index, lighted }: GridLightCellProps) {
  return show ? (
    <button
      aria-label={`grid cell ${index} ${lighted ? 'lit' : 'unlit'}`}
      className={`w-28 h-28  border-2 hover:bg-green-100 cursor-pointer ${
        lighted ? 'bg-green-600' : ''
      }`}
      aria-pressed={lighted}
      onClick={() => !lighted && onClick(index)}
    ></button>
  ) : (
    <div className='w-28 h-28 '></div>
  );
}

export default GridCell;
