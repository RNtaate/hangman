import React from 'react';
import KeyBoard from '../components/KeyBoard';
import HangmanCanvas from '../components/HangmanCanvas';
import PlayedWord from '../components/PlayedWord';

const GamePage = () => {
  return (
    <div className="flex flex-col md:justify-between md:min-h-screen md:max-h-screen">
      <HangmanCanvas />
      <PlayedWord />
      <KeyBoard />
    </div>
  );
};

export default GamePage;
