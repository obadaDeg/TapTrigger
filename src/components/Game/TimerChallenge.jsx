// src/components/Game/TimerChallenge.jsx
import { useRef, useEffect } from 'react';
import useTimer from '../../hooks/useTimer';
import { useGameContext } from '../../context/GameContext';
import ResultModal from './ResultModal';
import Button from '../ui/Button';

export default function TimerChallenge({ title, targetTime, difficulty }) {
  const { timeRemaining, isActive, startTimer, stopTimer, resetTimer, cleanup } = 
    useTimer(targetTime * 1000);
  
  const dialog = useRef();
  const { playerName, saveScore } = useGameContext();
  
  const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
  
  // Handle game completion
  useEffect(() => {
    if (timeRemaining <= 0) {
      dialog.current.open();
      // Player lost - give a score of 0
      saveScore(difficulty, 0);
    }
  }, [timeRemaining, difficulty, saveScore]);
  
  // Cleanup interval on component unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
  
  function handleStart() {
    startTimer();
  }
  
  function handleStop() {
    stopTimer();
    dialog.current.open();
    // Calculate and save score
    const calculatedScore = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
    saveScore(difficulty, calculatedScore);
  }
  
  function handleReset() {
    resetTimer();
  }
  
  // Visual feedback based on time remaining
  let statusClass = '';
  if (isActive) {
    const percentRemaining = timeRemaining / (targetTime * 1000);
    if (percentRemaining < 0.25) {
      statusClass = 'critical';
    } else if (percentRemaining < 0.5) {
      statusClass = 'warning';
    } else {
      statusClass = 'active';
    }
  }
  
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        playerName={playerName}
        score={score}
        onReset={handleReset}
        difficulty={difficulty}
      />
      
      <section className={`challenge ${statusClass}`}>
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        {isActive && (
          <p className="time-display">{formattedTimeRemaining}s</p>
        )}
        <div className="challenge-controls">
          <Button
            onClick={isActive ? handleStop : handleStart}
            className={isActive ? 'stop-button' : 'start-button'}
          >
            {isActive ? 'Stop' : 'Start'} Challenge
          </Button>
        </div>
        <p className={isActive ? 'status active' : 'status'}>
          {isActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}