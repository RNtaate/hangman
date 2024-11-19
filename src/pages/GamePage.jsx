import React from 'react';
import KeyBoard from '../components/KeyBoard';
import HangmanCanvas from '../components/HangmanCanvas';
import PlayedWord from '../components/PlayedWord';

const GamePage = () => {
  return (
    <div>
      <HangmanCanvas />
      <PlayedWord />
      <KeyBoard />
    </div>
  );
};

export default GamePage;
