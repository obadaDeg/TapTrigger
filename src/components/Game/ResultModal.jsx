import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { useGameContext } from "../../context/GameContext";
import Button from "../ui/Button";
import {
  calculateScore,
  formatTime,
  hasUserLost,
  getPerformanceMessage,
  getBadge,
  qualifiesForNextLevel,
  shouldCelebrate,
  getTipForImprovement,
} from "../../utils/scoreCalculator";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset, playerName, difficulty },
  ref
) {
  const dialog = useRef();
  const [showRankings, setShowRankings] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);
  const { getRankingForLevel, saveScore } = useGameContext();

  const userLost = hasUserLost(remainingTime);
  const formattedRemainingTime = formatTime(remainingTime);
  const score = calculateScore(remainingTime, targetTime);
  const badge = getBadge(score, userLost);
  const performanceMessage = getPerformanceMessage(score, userLost);
  const showNextLevel = qualifiesForNextLevel(score) && !userLost;

  const rankings = getRankingForLevel(difficulty);

  const playerRankIndex = rankings.findIndex(
    (entry) => entry.name === playerName
  );
  const playerRank = playerRankIndex !== -1 ? playerRankIndex + 1 : null;

  const isNewHighScore = playerRankIndex === 0 && playerName && score > 0;

  useEffect(() => {
    if (shouldCelebrate(score) && !userLost) {
      setShowConfetti(true);

      if (playerName && difficulty) {
        saveScore(difficulty, score);
      }

      setTimeout(() => {
        setAnimateScore(true);
      }, 300);
    }
  }, [score, userLost, playerName, difficulty, saveScore]);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
      setAnimateScore(false);
      setTimeout(() => {
        setAnimateScore(true);
      }, 300);
    },
  }));

  function handleToggleRankings() {
    setShowRankings((prev) => !prev);
  }

  function handleOverlayClick(e) {
    if (e.target === dialog.current) {
      handleClose();
      e.stopPropagation();
    }
  }

  function handleClose() {
    if (dialog.current) {
      dialog.current.close();
    }

    setShowRankings(false);
    setShowConfetti(false);
    setAnimateScore(false);
    onReset();
  }

  function handleRetry() {
    handleClose();
  }

  function handleNextLevel() {
    handleClose();
  }

  

  return createPortal(
    <dialog
      
      ref={dialog}
      className={`result-modal ${userLost ? "lost" : ""} ${
        score > 90 ? "high-score" : ""
      }`}
      onClick={handleOverlayClick}
      onCancel={handleClose}
    >
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="result-header">
        {userLost ? (
          <h2 className="result-lost">Time's Up!</h2>
        ) : (
          <h2 className={`result-score ${animateScore ? "animate" : ""}`}>
            Your Score: {score}
          </h2>
        )}

        {!userLost && (
          <div className="badge" style={{ backgroundColor: badge.color }}>
            {badge.name}
          </div>
        )}
      </div>

      {!userLost && (
        <div className="progress-container">
          <progress
            value={score}
            max="100"
            className={animateScore ? "animate" : ""}
          />
          <div className="progress-labels">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      )}

      <p className="result-message">{performanceMessage}</p>

      <div className="result-details">
        <div className="detail-row">
          <span className="detail-label">Target time:</span>
          <span className="detail-value">{targetTime} seconds</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Your time:</span>
          <span className="detail-value">
            {formattedRemainingTime} remaining
          </span>
        </div>
        {playerName && (
          <div className="detail-row">
            <span className="detail-label">Player:</span>
            <span className="detail-value">{playerName}</span>
          </div>
        )}
        <div className="detail-row">
          <span className="detail-label">Difficulty:</span>
          <span className="detail-value difficulty-badge">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
      </div>

      {isNewHighScore && (
        <div className="new-highscore">
          <div className="highscore-icon">🏆</div>
          <p>New High Score!</p>
        </div>
      )}

      {rankings.length > 0 && (
        <div className="rankings-section">
          <Button
            onClick={handleToggleRankings}
            className="rankings-toggle"
            variant="outline"
          >
            {showRankings ? "Hide" : "Show"} High Scores
          </Button>

          {showRankings && (
            <div className="rankings-list">
              <h3>
                Top Scores for{" "}
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </h3>
              <ol>
                {rankings.slice(0, 5).map((entry, index) => (
                  <li
                    key={index}
                    className={
                      entry.name === playerName ? "current-player" : ""
                    }
                  >
                    <div className="ranking-position">#{index + 1}</div>
                    <span className="ranking-name">{entry.name}</span>
                    <span className="ranking-score">{entry.score}</span>
                  </li>
                ))}
              </ol>

              {playerRank && playerRank > 5 && (
                <div className="your-rank">
                  <div className="rank-divider"></div>
                  <div className="rank-position">#{playerRank}</div>
                  <span className="rank-name">{playerName}</span>
                  <span className="rank-score">
                    {rankings[playerRankIndex].score}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="modal-actions">
        <Button
          onClick={handleRetry}
          className="play-again-button"
          variant="primary"
        >
          {userLost ? "Try Again" : "Play Again"}
        </Button>

        {showNextLevel && (
          <Button
            onClick={handleNextLevel}
            className="next-level-button"
            variant="success"
          >
            Try Next Level
          </Button>
        )}
      </div>

      {userLost && (
        <div className="tip-section">
          <p className="tip-text">
            <strong>Tip:</strong> {getTipForImprovement(difficulty)}
          </p>
        </div>
      )}
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
