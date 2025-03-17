import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="game-footer">
      <p>
        Try to stop the timer with less than 0.10 seconds remaining for a perfect score!
      </p>
      <p className="copyright">
        &copy; {currentYear} The Almost Final Countdown Game
      </p>
    </footer>
  );
}