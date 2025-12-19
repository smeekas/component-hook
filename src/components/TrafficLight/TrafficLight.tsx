import SingleLight from './SingleLight';
import { TrafficLightItem, TrafficLightProps } from './TrafficLight.types';
import styles from './TrafficLight.module.css';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

const ADD_MORE_SECONDS = 5000;

function TrafficLight({
  lights,
  initialLightOrder,
  trafficRef,
}: TrafficLightProps) {
  const sortedLight = useMemo(
    () => [...lights].sort((a, b) => a.order - b.order),
    [lights]
  );

  /**
   * @description ref to manage timeout of light
   */
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  /**
   * @description ref to store time (helps in pausing, resuming, increasing duration)
   * it saves timestamp when light is activated
   */
  const startTimeRef = useRef<null | number>(null);

  /**
   * @description used in features when we need to store remaining time for active light
   */
  const remainingTimeRef = useRef<null | number>(null);
  /**
   * @description ref to store if time is paused or not
   */
  const pauseRef = useRef<boolean>(false); // this should be state if button disable state is needed

  /**
   * @description function that clears timeout
   */
  const clearTimeoutFn = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  /**
   * @description map that stores, order with it's light data
   * helps in O(1) access
   */
  const map = useMemo(() => {
    const lightMap = new Map<number, TrafficLightItem>();
    sortedLight.forEach((lightItem) => {
      lightMap.set(lightItem.order, lightItem);
    });
    return lightMap;
  }, [sortedLight]);

  /**
   * @description state to store active light
   */
  const [activeOrder, setActiveOrder] = useState<number | null>(
    initialLightOrder
  );

  /**
   * @description function to update current time
   */
  const updateCurrentTime = useCallback(() => {
    startTimeRef.current = performance.now();
  }, []);

  /**
   * @description on start update time (as we are starting) and start initial given light
   */
  const onStart = () => {
    const lightItem = map.get(initialLightOrder);
    if (lightItem && activeOrder === null) {
      startTimeRef.current = null;
      remainingTimeRef.current = null;
      setActiveOrder(lightItem.order);
      updateCurrentTime();
    }
  };

  /**
   * @description on reset clear timeout of existing light and set current light as null
   */
  const onReset = () => {
    clearTimeoutFn();
    setActiveOrder(null);
    pauseRef.current = false;
    remainingTimeRef.current = null;
    startTimeRef.current = null;
  };

  /**
   * @description effect that sets timeout for current active light
   */
  useEffect(() => {
    if (!activeOrder) return;

    // get current active light
    const lightItem = map.get(activeOrder);
    if (!lightItem) return;

    // start timer for current active light
    timerRef.current = setTimeout(() => {
      // if time out is over then set next light as active
      setActiveOrder(lightItem.next);
      // update current time as we are starting next light
      updateCurrentTime();
    }, lightItem.duration);
    return () => {
      // clear timeout for memory leak
      clearTimeoutFn();
    };
  }, [activeOrder, map, clearTimeoutFn, updateCurrentTime]);

  /**
   * @description function to manually change color
   *
   */
  function changeCurrentColor(order: number) {
    // clear active timeout, set given light as active, and update timestamp
    clearTimeoutFn();
    setActiveOrder(order);
    startTimeRef.current = null;
    pauseRef.current = false;
    remainingTimeRef.current = null;
    updateCurrentTime();
  }

  /**
   * @description on pause, clear active timeout and update timestamp
   */
  const onPause = useCallback(() => {
    clearTimeoutFn();
    if (!activeOrder) return;
    const lightItem = map.get(activeOrder);
    // get current active light
    if (!lightItem) return;

    if (startTimeRef.current === null) return; // if pause click without start, we want to avoid storing large negative number in ref
    //  we are storing how much time is left from duration
    //(performance.now() - (startTimeRef.current || 0)) will give elapsed time
    remainingTimeRef.current =
      lightItem.duration - (performance.now() - (startTimeRef.current || 0));
    pauseRef.current = true;
  }, [activeOrder, clearTimeoutFn, map]);

  /**
   * @description function to resume current light from where it left off
   */
  const onResume = useCallback(() => {
    if (!activeOrder) return;
    const lightItem = map.get(activeOrder);
    // get current active light
    if (!lightItem || !pauseRef.current || remainingTimeRef.current === null)
      return;
    //return if light is not paused and someone clicks resume

    // when paused, before that current active light ran and remainingTimeRef.current time is left.
    // so new time will not be entire duration but only remaining time
    const newTime = remainingTimeRef.current || 0;
    // we are resuming light so update the timer
    updateCurrentTime();
    remainingTimeRef.current = null; // since we resumed
    pauseRef.current = false; // mark this as false
    timerRef.current = setTimeout(() => {
      // set current light's timeout
      // once this finishes we will start next light
      setActiveOrder(lightItem.next);
      updateCurrentTime();
    }, newTime);
  }, [activeOrder, map, updateCurrentTime]);

  // exposing handlers to parent (for example 3 are given)
  useImperativeHandle(trafficRef, () => ({
    changeOrder: changeCurrentColor,
    pause: onPause,
    resume: onResume,
  }));

  const addMoreSecond = () => {
    clearTimeoutFn(); // clear existing timer

    if (!activeOrder) return;
    const lightItem = map.get(activeOrder);
    //get current active light
    if (!lightItem) return;
    if (pauseRef.current) {
      if (remainingTimeRef.current === null) return;
      const remainingTime = remainingTimeRef.current; // stored when paused
      // if time is paused then when it resume it should run for remaining time + extra time
      // so just update the ref
      // timer will not start automatically, user have to click resume again  (if it was paused)
      remainingTimeRef.current = remainingTime + ADD_MORE_SECONDS;
      return;
    }

    if (startTimeRef.current === null) return;
    // if it is not paused then we need to add more duration in current light
    // since it is not paused startTimeRef.current will be when light started
    const elapsedTime = performance.now() - startTimeRef.current;
    const newTime = lightItem.duration - elapsedTime + ADD_MORE_SECONDS;
    updateCurrentTime(); // since we from current time we have update the time, we need to update the current time
    /**
     * reason for updating current time is we can assume that since we cleared prev timeout and we are setting fresh timeout with new time
     * hence we need to update current time
     */
    timerRef.current = setTimeout(() => {
      // since we cleared prev timeout, we start new
      setActiveOrder(lightItem.next);
      updateCurrentTime();
    }, newTime);
  };
  const activeColor = activeOrder && map.get(activeOrder);
  return (
    <>
      <div className={`flex flex-col gap-4 ${styles.lightbox}`}>
        {lights.map((lightItem) => {
          return (
            <SingleLight
              color={lightItem.color}
              key={lightItem.order}
              active={lightItem.order === activeOrder}
            />
          );
        })}
      </div>
      <div>
        start or stop:
        <button onClick={onStart}>start</button>
        <button onClick={onReset}>reset</button>
      </div>
      <div>
        manual color change immediately:
        {lights.map((lightItem) => {
          return (
            <button
              key={lightItem.order}
              onClick={() => changeCurrentColor(lightItem.order)}
            >
              change {lightItem.color}
            </button>
          );
        })}
      </div>
      <div>
        stop or continue light:
        <button onClick={onPause}>pause</button>
        <button onClick={onResume}>resume</button>
      </div>
      <div>
        increase time in-between:
        <button onClick={addMoreSecond}>
          add {ADD_MORE_SECONDS / 1000} sec to current color
        </button>
      </div>
      {/* A11Y */}
      {activeColor && (
        <div
          role='status'
          aria-live='assertive'
          aria-atomic='true'
          style={{ width: 0, height: 0, overflow: 'hidden' }}
        >
          {`${activeColor.color} light on`}
        </div>
      )}
    </>
  );
}

export default TrafficLight;
