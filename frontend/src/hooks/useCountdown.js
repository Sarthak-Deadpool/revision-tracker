/** @format */

import { useCallback, useEffect, useState } from "react";

const useCountdown = (initialTime = 60) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((preTime) => preTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const restart = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return {
    timeLeft,
    isExpired: timeLeft === 0,
    restart,
  };
};

export default useCountdown;