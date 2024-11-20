import React, { useState, createContext, useContext, useRef } from 'react';
import drawOnCanvas from '../helpers/drawingOnCanvasHelpers';

export const GameContext = createContext();

export const getContextValues = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
  const [wrongGuessCount, setWrongGuessCount] = useState(0);

  const canvasRef = useRef(null);

  const handleDrawingHangman = (canvas, count) => {
    if (count < 10) {
      drawOnCanvas(canvas, count);
      setWrongGuessCount((prev) => prev + 1);
    }
  };

  const contextValue = {
    wrongGuessCount,
    setWrongGuessCount,
    canvasRef,
    handleDrawingHangman,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
