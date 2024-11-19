import React, { useRef } from 'react';
import letterKeys from '../services/letters';

const SingleKeyButton = ({ singleKeyLetter }) => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (buttonRef) {
      setTimeout(() => (buttonRef.current.disabled = true), 200);
    }
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      className="w-[12%] max-w-[50px] aspect-square bg-sky-500 text-white disabled:opacity-[0.4] shadow-md rounded-full active:scale-150 select-none transition-all active:disabled:scale-100 disabled:cursor-not-allowed"
      onClick={handleClick}
    >
      {letterKeys[singleKeyLetter]}
    </button>
  );
};

export default SingleKeyButton;
