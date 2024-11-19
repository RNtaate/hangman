import React from 'react';
import letterKeys from '../services/letters';
import SingleKeyButton from './SingleKeyButton';

const KeyBoard = () => {
  const keysArray = Object.keys(letterKeys);
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
