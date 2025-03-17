// src/components/Layout/Header.jsx
import React from 'react';

export default function Header() {
  return (
    <header className="game-header">
      <h1>The <em>Almost</em> Final Countdown</h1>
      <div className="game-instructions">
        <p>Stop the timer when you think time is almost up!</p>
        <p className="subtitle">The closer to 0 seconds you stop, the higher your score!</p>
      </div>
    </header>
  );
}