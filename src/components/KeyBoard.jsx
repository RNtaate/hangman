import React, { useEffect } from 'react';
import letterKeys from '../services/letters';
import SingleKeyButton from './SingleKeyButton';
import { getContextValues } from '../context/GameContextProvider';

const KeyBoard = () => {
  const { keyBoardReset, setKeyBoardReset } = getContextValues();
  const keysArray = Object.keys(letterKeys);

  useEffect(() => {
    if (keyBoardReset) {
      setKeyBoardReset(false);
    }
  }, [keyBoardReset, setKeyBoardReset]);

  return (
    <section className="min-w-[320px] w-full p-4">
      <div className="w-full flex flex-wrap gap-3 justify-center py-3 bg-white shadow-md rounded-md">
        {keysArray.map((singleKey) => {
          return (
            <SingleKeyButton key={singleKey} singleKeyLetter={singleKey} />
          );
        })}
      </div>
    </section>
  );
};

export default KeyBoard;
