import React from 'react';
import KeyBoard from '../components/KeyBoard';
import HangmanCanvas from '../components/HangmanCanvas';

const GamePage = () => {
  return (
    <div>
      <HangmanCanvas />
      <KeyBoard />
    </div>
  );
};

export default GamePage;
