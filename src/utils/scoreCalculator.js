/**
 * Utility functions for score calculation and result feedback
 */

/**
 * Calculate score based on remaining time and target time
 * @param {number} remainingTime - Time remaining in milliseconds
 * @param {number} targetTime - Target time in seconds
 * @returns {number} Score from 0-100
 */
export const calculateScore = (remainingTime, targetTime) => {
    // Convert target time to milliseconds for calculation
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
    
    // Ensure score is between 0 and 100 and round to nearest integer
    return Math.max(0, Math.min(100, Math.round(scorePercentage)));
  };
  
  /**
   * Format milliseconds into a readable time string
   * @param {number} milliseconds - Time in milliseconds
   * @param {boolean} includeMs - Whether to include milliseconds in output
   * @returns {string} Formatted time string
   */
  export const formatTime = (milliseconds, includeMs = true) => {
    if (milliseconds < 0) {
      return includeMs ? '0.00s' : '0s';
    }
    
    const seconds = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    
    if (includeMs) {
      return `${seconds}.${String(Math.floor(ms / 10)).padStart(2, '0')}s`;
    }
    
    return `${seconds}s`;
  };
  
  /**
   * Check if the user lost (timer reached zero)
   * @param {number} remainingTime - Time remaining in milliseconds
   * @returns {boolean} True if user lost, false otherwise
   */
  export const hasUserLost = (remainingTime) => {
    return remainingTime <= 0;
  };
  
  /**
   * Get performance message based on score
   * @param {number} score - User's score (0-100)
   * @param {boolean} userLost - Whether user lost the round
   * @returns {string} Feedback message
   */
  export const getPerformanceMessage = (score, userLost) => {
    if (userLost) return "Time's up! You lost this round.";
    if (score > 95) return "Perfect timing! You're a timing master!";
    if (score > 90) return "Amazing timing! You're a natural!";
    if (score > 80) return "Great job! Almost perfect timing!";
    if (score > 70) return "Good effort! You're getting better!";
    if (score > 50) return "Nice try! Keep practicing!";
    if (score > 30) return "You can do better! Try to stop closer to zero.";
    return "Keep practicing your timing skills!";
  };
  
  /**
   * Get badge information based on score
   * @param {number} score - User's score (0-100)
   * @param {boolean} userLost - Whether user lost the round
   * @returns {Object} Badge with name and color properties
   */
  export const getBadge = (score, userLost) => {
    if (userLost) return { name: 'Time Lost', color: '#ff6b6b' };
    if (score > 95) return { name: 'Perfect!', color: '#4cd137' };
    if (score > 90) return { name: 'Expert', color: '#1dd1a1' };
    if (score > 80) return { name: 'Advanced', color: '#00a8ff' };
    if (score > 70) return { name: 'Skilled', color: '#2e86de' };
    if (score > 50) return { name: 'Decent', color: '#5f27cd' };
    if (score > 30) return { name: 'Novice', color: '#8395a7' };
    return { name: 'Beginner', color: '#c8d6e5' };
  };
  
  /**
   * Check if score qualifies for trying the next level
   * @param {number} score - User's score (0-100)
   * @returns {boolean} True if score qualifies for next level
   */
  export const qualifiesForNextLevel = (score) => {
    return score > 85;
  };
  
  /**
   * Check if score should trigger celebration effects
   * @param {number} score - User's score (0-100)
   * @returns {boolean} True if score is celebration-worthy
   */
  export const shouldCelebrate = (score) => {
    return score > 90;
  };
  
  /**
   * Get a tip for improving performance
   * @param {string} difficulty - Current difficulty level
   * @returns {string} Tip for improvement
   */
  export const getTipForImprovement = (difficulty) => {
    const tips = [
      "Try to develop a rhythm in your head to better track the time.",
      "Focus on the progress bar's color changes for visual cues.",
      "Practice makes perfect! Keep trying to improve your timing.",
      "Try closing your eyes and counting in your head for better focus."
    ];
    
    // Return a tip based on difficulty, or a random one
    switch(difficulty) {
      case 'easy':
        return tips[0];
      case 'medium':
        return tips[1];
      case 'hard':
        return tips[2];
      case 'expert':
        return tips[3];
      default:
        return tips[Math.floor(Math.random() * tips.length)];
    }
  };