import React from 'react';
import letterKeys from '../services/letters';

const KeyBoard = () => {
  const keysArray = Object.keys(letterKeys);
  return (
    <section className="min-w-[320px] w-full p-4">
      <div className="w-full flex flex-wrap gap-3 justify-center py-3 bg-white shadow-md rounded-md">
        {keysArray.map((singleKey) => {
          return (
            <button
              type="button"
              key={singleKey}
              className="w-[12%] max-w-[50px] aspect-square bg-sky-500 text-white disabled:opacity-[0.4] shadow-md rounded-full active:scale-150 select-none transition-all active:disabled:scale-100 disabled:cursor-not-allowed"
              disabled={singleKey == 'A' || singleKey == 'T' ? true : false}
            >
              {letterKeys[singleKey]}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default KeyBoard;
