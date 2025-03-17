/**
 * Formats milliseconds into a readable time string
 * @param {number} milliseconds - The time in milliseconds
 * @param {boolean} showMilliseconds - Whether to show milliseconds
 * @returns {string} Formatted time string
 */
export function formatTime(milliseconds, showMilliseconds = true) {
    if (milliseconds < 0) {
      return showMilliseconds ? '0.00s' : '0s';
    }
    
    const seconds = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    
    if (showMilliseconds) {
      return `${seconds}.${String(Math.floor(ms / 10)).padStart(2, '0')}s`;
    }
    
    return `${seconds}s`;
  }
  
  /**
   * Calculates score based on remaining time and target time
   * @param {number} remainingTime - Time remaining in milliseconds
   * @param {number} targetTime - Target time in seconds
   * @returns {number} Score from 0-100
   */
  export function calculateScore(remainingTime, targetTime) {
    // Convert target time to milliseconds
    const targetTimeMs = targetTime * 1000;
    
    // If time's up or negative, score is 0
    if (remainingTime <= 0) {
      return 0;
    }
    
    // Perfect score for stopping with less than 100ms remaining
    if (remainingTime > 0 && remainingTime < 100) {
      return 100;
    }
    
    // Otherwise, score based on how close to the end they stopped
    // The closer to 0 remaining, the higher the score
    const scorePercentage = (1 - (remainingTime / targetTimeMs)) * 100;
    
    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, Math.round(scorePercentage)));
  }
  
  /**
   * Returns a message based on player's performance
   * @param {number} score - The player's score (0-100)
   * @param {boolean} timeExpired - Whether time expired
   * @returns {string} Performance message
   */
  export function getPerformanceMessage(score, timeExpired) {
    if (timeExpired) {
      return "Time's up! You lost this round.";
    }
    
    if (score === 100) {
      return "Perfect timing! You're a timing genius!";
    }
    
    if (score > 90) {
      return "Amazing! Your timing is exceptional!";
    }
    
    if (score > 80) {
      return "Great job! Almost perfect timing!";
    }
    
    if (score > 70) {
      return "Good effort! You have solid timing skills!";
    }
    
    if (score > 50) {
      return "Nice try! Keep practicing your timing!";
    }
    
    if (score > 30) {
      return "Getting there! More practice will help!";
    }
    
    return "You can do better! Try stopping closer to zero next time.";
  }