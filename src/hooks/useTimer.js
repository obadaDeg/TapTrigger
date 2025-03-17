// src/hooks/useTimer.js
import { useState, useRef, useCallback } from 'react';

export default function useTimer(initialTime) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 10) {
            clearInterval(timerRef.current);
            setIsActive(false);
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    }
  }, [isActive]);

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current);
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setTimeRemaining(initialTime);
  }, [initialTime]);

  const cleanup = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  return {
    timeRemaining,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
    cleanup
  };
}