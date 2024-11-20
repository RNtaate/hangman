import React from 'react';
import KeyBoard from '../components/KeyBoard';
import HangmanCanvas from '../components/HangmanCanvas';
import PlayedWord from '../components/PlayedWord';
import { getContextValues } from '../context/GameContextProvider';

const GamePage = () => {
  const { gameOver, winStatus, wrongGuessCount } = getContextValues();

  return (
    <div className="flex flex-col md:justify-around md:min-h-screen md:max-h-screen relative">
      {gameOver && (
        <div className="absolute top-0 left-0 right-0 bottom-0">
          GAME OVER
          <p>{winStatus}</p>
        </div>
      )}
      <HangmanCanvas />
      <PlayedWord />
      <KeyBoard />
    </div>
  );
};

export default GamePage;
