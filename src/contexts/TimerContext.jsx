import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [, setStartTime] = useState(0);
  const [lastVisibleTime, setLastVisibleTime] = useState(Date.now());

  useEffect(() => {
    const savedTimer = localStorage.getItem("stopwatchTimer");
    if (savedTimer) {
      setTimer(parseInt(savedTimer));
      setIsRunning(false);
      setStartTime(Date.now() - parseInt(savedTimer) * 1000);
    }
  }, []);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        if (isRunning) {
          const elapsed = Math.floor((Date.now() - lastVisibleTime) / 1000);
          setStartTime((prevStartTime) => prevStartTime + elapsed * 1000);
        }
        setLastVisibleTime(Date.now());
      } else {
        setLastVisibleTime(Date.now());
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isRunning, lastVisibleTime]);

  useEffect(() => {
    if (isRunning) {
      localStorage.setItem("stopwatchTimer", timer.toString());
    }
  }, [timer, isRunning]);

  return (
    <TimerContext.Provider
      value={{
        timer,
        isRunning,
        setTimer,
        setIsRunning,
        setStartTime
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;

TimerProvider.propTypes = {
  children: PropTypes.node
};