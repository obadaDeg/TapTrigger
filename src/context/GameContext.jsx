// src/context/GameContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext({
  playerName: '',
  scores: {},
  highScores: {},
  setPlayerName: () => {},
  saveScore: () => {},
  resetScores: () => {},
  getRankingForLevel: () => {}
});

export function GameProvider({ children }) {
  const [playerName, setPlayerName] = useState(() => {
    const savedName = localStorage.getItem('playerName');
    return savedName || '';
  });
  
  const [scores, setScores] = useState({});
  const [highScores, setHighScores] = useState(() => {
    const savedScores = localStorage.getItem('highScores');
    return savedScores ? JSON.parse(savedScores) : {};
  });

  // Save player name to localStorage
  useEffect(() => {
    if (playerName) {
      localStorage.setItem('playerName', playerName);
    }
  }, [playerName]);

  // Save high scores to localStorage
  useEffect(() => {
    if (Object.keys(highScores).length > 0) {
      localStorage.setItem('highScores', JSON.stringify(highScores));
    }
  }, [highScores]);

  const saveScore = (level, score) => {
    // Save to current session scores
    setScores(prev => ({
      ...prev,
      [level]: score
    }));

    // Update high scores if this is a better score
    setHighScores(prev => {
      const prevScore = prev[level]?.[playerName] || 0;
      if (!prev[level] || score > prevScore) {
        return {
          ...prev,
          [level]: {
            ...prev[level],
            [playerName]: score
          }
        };
      }
      return prev;
    });
  };

  const resetScores = () => {
    setScores({});
  };

  const getRankingForLevel = (level) => {
    if (!highScores[level]) return [];
    
    // Convert to array and sort
    return Object.entries(highScores[level])
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Get top 5
  };

  const value = {
    playerName,
    scores,
    highScores,
    setPlayerName,
    saveScore,
    resetScores,
    getRankingForLevel
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGameContext = () => useContext(GameContext);

export default GameContext;