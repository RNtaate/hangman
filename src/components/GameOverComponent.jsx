import React from 'react';

import { getContextValues } from '../context/GameContextProvider';
import { useQueryClient } from '@tanstack/react-query';
import { queryClient } from '../main';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const GameOverComponent = () => {
  const { winStatus, resetGame, originalWord, gameOver } = getContextValues();

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
    <section
      className={`fixed md:absolute top-0 left-0 right-0 bottom-0 bg-slate-900/[0.7] z-10 px-10 py-20 ${gameOver ? 'scale-100' : 'scale-0'} transition-all duration-[500ms]`}
    >
      {winStatus == 'WIN' && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={100}
          initialVelocityY={20}
        />
      )}
      <div
        className={`w-full h-[75%] rounded-xl flex flex-col justify-center items-center gap-4 ${winStatus == 'WIN' ? 'bg-green-300/[0.8]' : 'bg-red-400/[0.8]'} shadow-lg px-5`}
      >
        <p className="text-2xl text-slate-700">
          {winStatus == 'WIN' ? 'YAY! YOU WIN' : 'SORRY!!, YOU LOSE'}
        </p>

        <div className="text-slate-700">
          Word is : <b>{originalWord}</b>
        </div>

        <button
          type="button"
          className="bg-sky-400 text-white w-full py-3 rounded-xl  active:scale-[0.9] transition-all delay-0 shadow-lg"
          onClick={handleRestartingOrResettingGame}
        >
          Play Again
        </button>
        <button
          type="button"
          className="text-white bg-red-700 w-full py-3 rounded-xl active:scale-[0.9] transition-all shadow-lg"
          onClick={() => handleRestartingOrResettingGame(false)}
        >
          Quit
        </button>
      </div>
    </section>
  );
};

export default GameOverComponent;
