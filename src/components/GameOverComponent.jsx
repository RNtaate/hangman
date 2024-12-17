import React from 'react';

import { getContextValues } from '../context/GameContextProvider';
import { useQueryClient } from '@tanstack/react-query';
import { queryClient } from '../main';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const GameOverComponent = () => {
  const { winStatus, resetGame, originalWord } = getContextValues();

  const innerQueryClient = useQueryClient(queryClient);
  const [width, height] = useWindowSize();

  const handleRestartingOrResettingGame = (booleanOption = true) => {
    innerQueryClient.clear();
    innerQueryClient.invalidateQueries({ queryKey: ['word'] });
    if (!booleanOption) {
      resetGame(false);
    } else {
      resetGame();
    }
  };

  return (
    <section className="fixed md:absolute top-0 left-0 right-0 bottom-0 bg-slate-900/[0.7] z-10 px-10 py-20">
      {winStatus == 'WIN' && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={100}
          initialVelocityY={20}
        />
      )}
      <div
        className={`w-full h-[75%] rounded-xl flex flex-col justify-center items-center gap-3 ${winStatus == 'WIN' ? 'bg-green-300' : 'bg-red-400'} shadow-lg`}
      >
        {/* <h3 className="text-2xl text-slate-700">GAME OVER</h3> */}
        <p className="text-xl text-slate-700">
          {winStatus == 'WIN' ? 'YAY! YOU WIN' : 'SORRY!!, YOU LOSE'}
        </p>
        {winStatus == 'LOSS' && <p>Word is: {originalWord}</p>}
        <button type="button" onClick={handleRestartingOrResettingGame}>
          Play Again
        </button>
        <button
          type="button"
          onClick={() => handleRestartingOrResettingGame(false)}
        >
          Quit
        </button>
      </div>
    </section>
  );
};

export default GameOverComponent;
