import React, { useState, createContext, useContext } from 'react';

export const GameContext = createContext();

export const getContextValues = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
  const [wrongGuessCount, setWrongGuessCount] = useState(0);

  const contextValue = {
    wrongGuessCount,
    setWrongGuessCount,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
