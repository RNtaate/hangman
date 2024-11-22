import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import KeyBoard from '../components/KeyBoard';
import HangmanCanvas from '../components/HangmanCanvas';
import PlayedWord from '../components/PlayedWord';
import { getContextValues } from '../context/GameContextProvider';
import { waitSimulation, wordToObjectConverter } from '../helpers/helpers';
import { playerModes } from '../services/letters';
import WordInput from '../components/WordInput';

const GamePage = () => {
  const {
    gameOver,
    winStatus,
    wrongGuessCount,
    playerMode,
    originalWord,
    setOriginalWord,
    wordObject,
    setWordObject,
    doublePlayerWordChoice,
    setDoublePlayerWordChoice,
  } = getContextValues();

  const { status, data, isLoading, error } = useQuery({
    queryKey: ['word'],
    queryFn: () => {
      return waitSimulation(3000).then(() => {
        return 'CHARACTERISTICS';
      });
    },
    enabled: playerMode != playerModes.double || doublePlayerWordChoice != '',
  });

  useEffect(() => {
    if (status == 'success') {
      console.log(data);
      let word = data.toString().toUpperCase();
      setOriginalWord(word);
      setWordObject({ ...wordToObjectConverter(word) });
    }

    if (status == 'error' && playerMode == playerModes.double) {
      setDoublePlayerWordChoice('');
    }
  }, [status]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (status == 'error') {
    if (playerMode == playerModes.double) {
      return <WordInput />;
    }
    return <div>{JSON.stringify(error)}</div>;
  }

  if (playerMode == playerModes.double && doublePlayerWordChoice == '') {
    return <WordInput />;
  }

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
