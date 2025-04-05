import { useState } from 'react';
import GridCell from './GridCell';
import { GridLightProps } from './gridLights.types';
import styles from './GridLights.module.css';
function GridLights({ shape }: GridLightProps) {
  const [boxQueue, setBoxQueue] = useState<number[]>([]);

  /**
   * @description get total number of visible boxes
   */
  const totalBoxes = shape
    .flat(2)
    .filter((shapeItem) => shapeItem === 1).length;

  const startReversing = () => {
    let interval: null | ReturnType<typeof setInterval> = null;
    // start reversing
    interval = setInterval(() => {
      setBoxQueue((prev) => {
        const newArr = [...prev];
        newArr.shift();
        if (newArr.length === 0 && interval) clearInterval(interval);
        return newArr;
      });
    }, 500);
  };

  /**
   *
   * @description on click of box add new index and if all boxes are lit then start un-lighting
   */
  const onBoxClick = (queueItem: number) => {
    const newBoxes = [...boxQueue, queueItem];
    setBoxQueue(newBoxes);

    if (newBoxes.length === totalBoxes) {
      startReversing();
    }
  };

  /**
   * @description to iterate over shape
   */
  const flattenedShape = shape.flat(2);

  /**
   * @description get maximum row size for grid
   */
  const rowSize = Math.max(...shape.map((shapeItem) => shapeItem.length));
  return (
    <div
      style={{ gridTemplateColumns: `repeat( ${rowSize} , 1fr )` }}
      className={styles.lightGrid}
    >
      {flattenedShape.map((rowItem, rowIndex) => {
        return (
          <GridCell
            onClick={onBoxClick}
            index={rowIndex}
            lighted={boxQueue.includes(rowIndex)}
            key={rowIndex}
            show={rowItem === 1}
          />
        );
      })}
    </div>
  );
}

export default GridLights;
