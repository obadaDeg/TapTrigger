// src/App.jsx
import { GameProvider } from './context/GameContext';
import Player from './components/Game/Player';
import TimerChallenge from './components/Game/TimerChallenge';
import AdBanner from './components/Ads/AdBanner';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  const challenges = [
    { id: 'easy', title: 'Easy Peasy', targetTime: 5, difficulty: 'easy' },
    { id: 'medium', title: 'Master Timer', targetTime: 1, difficulty: 'medium' },
    { id: 'hard', title: 'Hardcore Mode', targetTime: .75, difficulty: 'hard' },
    { id: 'insane', title: 'Insane Mode', targetTime: .5, difficulty: 'insane' },
    { id: 'impossible', title: 'Impossible Task', targetTime: .25, difficulty: 'impossible' },
  ];

  return (
    <GameProvider>
      <div className="game-container">
        <Header />
        
        <main>
          <Player />
          
          <div className="ad-wrapper outer-ad">
            <AdBanner format="horizontal" />
          </div>
          
          <div id="challenges" className="challenge-grid">
            {challenges.map(challenge => (
              <TimerChallenge
                key={challenge.id}
                title={challenge.title}
                targetTime={challenge.targetTime}
                difficulty={challenge.difficulty}
              />
            ))}
          </div>
          
          <div className="ad-wrapper outer-ad">
            <AdBanner format="horizontal" />
          </div>
        </main>
        
        <Footer />
      </div>
    </GameProvider>
  );
}

export default App;