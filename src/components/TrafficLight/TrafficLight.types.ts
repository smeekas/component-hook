import { RefObject } from 'react';

export type TrafficLightItem = {
  color: string;
  duration: number;
  order: number;
  next: number;
};
export type TrafficLightProps = {
  lights: TrafficLightItem[];
  initialLightOrder: number;
  trafficRef?: RefObject<TrafficLightRef | undefined>;
};
export type TrafficLightRef = {
  pause: () => void;
  resume: () => void;
  changeOrder: (order: number) => void;
};
