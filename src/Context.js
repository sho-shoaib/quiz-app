import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [onQuiz, setOnQuiz] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);
  var timer;

  useEffect(() => {
    if (startTimer && !pauseTimer) {
      setOnQuiz(true);
      timer = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  });

  return (
    <AppContext.Provider
      value={{
        seconds,
        setSeconds,
        onQuiz,
        setOnQuiz,
        timer,
        setStartTimer,
        setPauseTimer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
