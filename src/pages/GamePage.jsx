import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import KeyBoard from '../components/KeyBoard';
import HangmanCanvas from '../components/HangmanCanvas';
import PlayedWord from '../components/PlayedWord';
import { getContextValues } from '../context/GameContextProvider';
import { waitSimulation, wordToObjectConverter } from '../helpers/helpers';
import { playerModes } from '../services/letters';
import WordInput from '../components/WordInput';
import { queryClient } from '../main';

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
    playGame,
    resetGame,
  } = getContextValues();

  const navigate = useNavigate();
  const innerQueryClient = useQueryClient(queryClient);

  const { status, data, isLoading, error, isFetching, fetchStatus } = useQuery({
    queryKey: ['word'],
    queryFn: () => {
      return waitSimulation(2000).then(() => {
        console.log('I have fetched something');
        return 'JAVA';
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

  useEffect(() => {
    if (!playGame) {
      navigate('/', { replace: true });
    }
  }, []);

  if (isLoading || isFetching) {
    return <div>Loading ...{status}</div>;
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
          <button
            onClick={() => {
              innerQueryClient.clear();
              innerQueryClient.invalidateQueries({ queryKey: ['word'] });
              resetGame();
            }}
          >
            Play Again
          </button>
        </div>
      )}
      <HangmanCanvas />
      <PlayedWord />
      <KeyBoard />
    </div>
  );
};

export default GamePage;
