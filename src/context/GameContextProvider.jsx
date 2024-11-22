import React, { useState, createContext, useContext, useRef } from 'react';
import drawOnCanvas from '../helpers/drawingOnCanvasHelpers';
import { wordToObjectConverter } from '../helpers/helpers';
import { playerModes } from '../services/letters';

export const GameContext = createContext();

export const getContextValues = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
  const MAXIMUM_WRONG_COUNT = 10;

  const [playGame, setPlayGame] = useState(false);
  const [playerMode, setPlayerMode] = useState(playerModes.single);
  const [doublePlayerWordChoice, setDoublePlayerWordChoice] = useState('');
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [originalWord, setOriginalWord] = useState('');
  const [wordObject, setWordObject] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [winStatus, setWinStatus] = useState('');
  const [canvasReset, setCanvasReset] = useState(true);
  const [keyBoardReset, setKeyBoardReset] = useState(true);

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

  const resetGame = (playGameBoolean = true) => {
    setDoublePlayerWordChoice('');
    setWrongGuessCount(0);
    setOriginalWord('');
    setWordObject({});
    setGameOver(false);
    setWinStatus('');
    setCanvasReset(true);
    setKeyBoardReset(true);

    if (!playGameBoolean) {
      setPlayGame(false);
      setPlayerMode(playerModes.single);
    }
  };

  const contextValue = {
    MAXIMUM_WRONG_COUNT,
    playGame,
    setPlayGame,
    playerMode,
    setPlayerMode,
    doublePlayerWordChoice,
    setDoublePlayerWordChoice,
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
    canvasReset,
    setCanvasReset,
    keyBoardReset,
    setKeyBoardReset,
    resetGame,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
