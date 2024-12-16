import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import KeyBoard from '../components/KeyBoard';
import HangmanCanvas from '../components/HangmanCanvas';
import PlayedWord from '../components/PlayedWord';
import { getContextValues } from '../context/GameContextProvider';
import {
  wordToObjectConverter,
  fetchOrConfirmWord,
} from '../helpers/helperMethods';
import { playerModes } from '../services/letters';
import WordInput from '../components/WordInput';
import { queryClient } from '../main';

const GamePage = () => {
  const {
    gameOver,
    winStatus,
    playerMode,
    originalWord,
    setOriginalWord,
    setWordObject,
    doublePlayerWordChoice,
    setDoublePlayerWordChoice,
    playGame,
    resetGame,
  } = getContextValues();

  const navigate = useNavigate();
  const innerQueryClient = useQueryClient(queryClient);
  const [width, height] = useWindowSize();

  const { status, data, isLoading, error, isFetching } = useQuery({
    queryKey: ['word'],
    queryFn: () => {
      return fetchOrConfirmWord(doublePlayerWordChoice).then((response) => {
        return response;
      });
    },
    enabled: playerMode != playerModes.double || doublePlayerWordChoice != '',
  });

  useEffect(() => {
    if (status == 'success') {
      let word = '';
      if (playerMode == playerModes.double) {
        word = doublePlayerWordChoice.toString().toUpperCase();
      } else {
        word = data.data[0].toString().toUpperCase();
      }
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
    return <div>Loading ...</div>;
  }

  if (status == 'error') {
    if (playerMode == playerModes.double) {
      let errorMessage =
        'Sorry!, Something went wrong which could be a network error, please try again later.';
      if (error.status == 404 || error.code == 'ERR_BAD_REQUEST') {
        errorMessage =
          "Sorry!, we don't seem to have that word in our dictionary. Please check your spelling or try another word.";
      }
      return <WordInput incomingError={errorMessage} />;
    }
    return (
      <div>{`Sorry!, Something went wrong. It could be a network error. Please try again later. ${error.message}`}</div>
    );
  }

  if (playerMode == playerModes.double && doublePlayerWordChoice == '') {
    return <WordInput />;
  }

  return (
    <div className="flex flex-col md:justify-around md:min-h-screen md:max-h-screen relative">
      {gameOver && (
        <>
          {winStatus == 'WIN' && (
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={1000}
            />
          )}
          <div className="absolute top-0 left-0 right-0 bottom-0">
            GAME OVER
            <p>{winStatus}</p>
            {winStatus == 'LOSS' && <p>Word is: {originalWord}</p>}
            <button
              onClick={() => {
                innerQueryClient.clear();
                innerQueryClient.invalidateQueries({ queryKey: ['word'] });
                resetGame();
              }}
            >
              Play Again
            </button>
            <button
              className="block"
              onClick={() => {
                innerQueryClient.clear();
                innerQueryClient.invalidateQueries({ queryKey: ['word'] });
                resetGame(false);
              }}
            >
              Quit
            </button>
          </div>
        </>
      )}
      <HangmanCanvas />
      <PlayedWord />
      <KeyBoard />
    </div>
  );
};

export default GamePage;
