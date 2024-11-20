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

  const canvasRef = useRef(null);

  const handleDrawingHangman = (canvas, count) => {
    if (count < MAXIMUM_WRONG_COUNT) {
      drawOnCanvas(canvas, count);
      setWrongGuessCount((prev) => prev + 1);
    }
  };

  const contextValue = {
    wrongGuessCount,
    setWrongGuessCount,
    canvasRef,
    handleDrawingHangman,
    originalWord,
    setOriginalWord,
    wordObject,
    setWordObject,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
