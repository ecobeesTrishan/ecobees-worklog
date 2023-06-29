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
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        const elapsed = Math.floor((Date.now() - lastVisibleTime) / 1000);
        setTimer((prevTimer) => prevTimer + elapsed);
        setLastVisibleTime(Date.now());

        if (!isRunning) {
          setStartTime(Date.now() - timer * 1000);
        }
      } else {
        setLastVisibleTime(Date.now());
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [lastVisibleTime]);

  useEffect(() => {
    localStorage.setItem("stopwatchTimer", timer.toString());
  }, [timer]);

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
  children: PropTypes.arrayOf(PropTypes.element)
};