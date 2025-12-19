import React, { memo } from 'react';
import styles from './TrafficLight.module.css';
type SingleLightProps = {
  color: string;
  active: boolean;
};

function SingleLight({ active, color }: SingleLightProps) {
  const lightStyles: React.CSSProperties = {
    backgroundColor: active ? color : 'white',
  };

  // a11y is irrelevant here as we are just mutating css
  return (
    <div
      role='status'
      aria-live='assertive'
      aria-label={`${color} light`}
      className={styles.light}
      aria-atomic='true'
      style={lightStyles}
    />
  );
}

export default memo(SingleLight);
