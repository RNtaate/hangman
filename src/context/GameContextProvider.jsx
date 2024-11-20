import React, { useState, createContext, useContext, useRef } from 'react';
import drawOnCanvas from '../helpers/drawingOnCanvasHelpers';
import { wordToObjectConverter } from '../helpers/helpers';

export const GameContext = createContext();

export const getContextValues = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
  const MAXIMUM_WRONG_COUNT = 10;

  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [originalWord, setOriginalWord] = useState('CHARACTERISTICS');
  const [wordObject, setWordObject] = useState({
    ...wordToObjectConverter(originalWord),
  });
  const [gameOver, setGameOver] = useState(false);
  const [winStatus, setWinStatus] = useState('');

  const canvasRef = useRef(null);

  const handleDrawingHangman = (canvas, count) => {
    if (count < MAXIMUM_WRONG_COUNT) {
      drawOnCanvas(canvas, count);
      setWrongGuessCount((prev) => prev + 1);
    }
  };

  const winCheck = (guessedLetter) => {
    let holdObj = { ...wordObject };
    if (holdObj[guessedLetter]) delete holdObj[guessedLetter];
    console.log('Wrong guess count inside winCheck', wrongGuessCount);

    //Check if the letter guessed exists in the word.
    if (wordObject[guessedLetter]) {
      //If the letter exists, check if it is the winning guess and end the game.
      if (JSON.stringify(holdObj) === '{}') {
        setWinStatus('WIN');
        setGameOver(true);
      }
      /**Winnning guess or not, return out of the winCheck function before proceeding below if this condition block holds true. If you proceed below, after this condition block held true, you would break the guessCount logic. */
      return;
    }

    //Check if it was the last guess when the player guessed a non-existant letter.
    if (wrongGuessCount + 1 >= MAXIMUM_WRONG_COUNT) {
      setWinStatus('LOSS');
      setGameOver(true);
      return;
    }
  };

  const contextValue = {
    MAXIMUM_WRONG_COUNT,
    wrongGuessCount,
    setWrongGuessCount,
    canvasRef,
    handleDrawingHangman,
    originalWord,
    setOriginalWord,
    wordObject,
    setWordObject,
    winCheck,
    gameOver,
    setGameOver,
    winStatus,
    setWinStatus,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
