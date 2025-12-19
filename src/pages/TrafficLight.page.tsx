import { useRef } from 'react';
import TrafficLight from '../components/TrafficLight/TrafficLight';
import {
  TrafficLightItem,
  TrafficLightRef,
} from '../components/TrafficLight/TrafficLight.types';

export function TrafficLightPage() {
  const light: TrafficLightItem[] = [
    {
      color: 'red',
      duration: 2000,
      order: 1,
      next: 2,
    },
    {
      color: 'yellow',
      duration: 1000,
      order: 3,
      next: 1,
    },
    {
      color: 'green',
      duration: 5000,
      order: 2,
      next: 3,
    },
  ];
  const trafficRef = useRef<TrafficLightRef>(undefined);
  return (
    <>
      <TrafficLight
        trafficRef={trafficRef}
        lights={light}
        initialLightOrder={1}
      />
      <button onClick={() => trafficRef.current?.pause()}>
        pause from parent
      </button>
      <button onClick={() => trafficRef.current?.resume()}>
        resume from child
      </button>
    </>
  );
}
