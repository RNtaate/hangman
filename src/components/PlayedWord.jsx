import React from 'react';

const PlayedWord = () => {
  const word = 'CHARACTERISTICS';
  const wordArray = word.split('');

  return (
    <div className="flex flex-wrap px-4 gap-y-1 gap-x-2 justify-center">
      {wordArray.map((letter, index) => {
        return (
          <div
            className="border-b-2 border-slate-400 font-bold text-slate-600 select-none min-w-[30px] max-w-[30px] aspect-square flex justify-center items-center"
            key={`${letter + index}`}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default PlayedWord;
