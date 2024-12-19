import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

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
import GameOverComponent from '../components/GameOverComponent';

const GamePage = () => {
  const {
    gameOver,
    playerMode,
    setOriginalWord,
    setWordObject,
    doublePlayerWordChoice,
    setDoublePlayerWordChoice,
    playGame,
  } = getContextValues();

  const navigate = useNavigate();

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
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-5 text-slate-700 py-20">
        <Spinner size={50} />
        <span className="text-sm">
          {playerMode == playerModes.double
            ? 'Confirming word...'
            : 'Fetching word...'}
        </span>
      </div>
    );
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
      <GameOverComponent />
      <HangmanCanvas />
      <PlayedWord />
      <KeyBoard />
    </div>
  );
};

export default GamePage;
