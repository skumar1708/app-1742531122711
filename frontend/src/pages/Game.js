import React, { useState, useEffect } from 'react';
import RunningMan from '../components/RunningMan';
import Wall from '../components/Wall';
import GameOver from '../components/GameOver';

function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [wallPosition, setWallPosition] = useState(window.innerWidth);

  useEffect(() => {
    const interval = setInterval(() => {
      setWallPosition((prev) => prev - 10);
      if (wallPosition < 50) {
        setIsGameOver(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [wallPosition]);

  const handlePunch = () => {
    if (wallPosition < 100) {
      setWallPosition(window.innerWidth);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        handlePunch();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (isGameOver) {
    return <GameOver />;
  }

  return (
    <div className="game-container">
      <RunningMan />
      <Wall style={{ left: wallPosition }} />
    </div>
  );
}

export default Game;