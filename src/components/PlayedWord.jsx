import React from 'react';

const PlayedWord = () => {
  const word = 'CHARACTERISTICS';
  const wordArray = word.split('');

  return (
    <div>
      {wordArray.map((letter) => {
        return <div>{letter}</div>;
      })}
    </div>
  );
};

export default PlayedWord;
