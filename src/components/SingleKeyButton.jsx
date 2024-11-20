import React, { useRef } from 'react';
import letterKeys from '../services/letters';
import { getContextValues } from '../context/GameContextProvider';

const SingleKeyButton = ({ singleKeyLetter }) => {
  const buttonRef = useRef(null);

  const {
    handleDrawingHangman,
    canvasRef,
    wrongGuessCount,
    wordObject,
    originalWord,
    setWordObject,
  } = getContextValues();

  const handleButtonClick = () => {
    if (buttonRef) {
      setTimeout(() => {
        buttonRef.current.disabled = true;

        if (wordObject[letterKeys[singleKeyLetter]]) {
          setWordObject((prev) => {
            let holdObj = { ...prev };
            delete holdObj[letterKeys[singleKeyLetter]];
            let newObj = { ...holdObj };
            return newObj;
          });
        } else {
          handleDrawingHangman(canvasRef.current, wrongGuessCount);
        }
      }, 200);
    }
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      className="w-[12%] max-w-[50px] aspect-square bg-sky-500 text-white disabled:opacity-[0.4] shadow-md rounded-full active:scale-150 select-none transition-all active:disabled:scale-100 disabled:cursor-not-allowed"
      onClick={handleButtonClick}
    >
      {letterKeys[singleKeyLetter]}
    </button>
  );
};

export default SingleKeyButton;
