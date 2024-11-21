import React from 'react';
import { useNavigate } from 'react-router-dom';
import { playerModes } from '../services/letters';
import { getContextValues } from '../context/GameContextProvider';

const HomePage = () => {
  const { setPlayerMode, setPlayGame } = getContextValues();

  const navigate = useNavigate();

  const handlePlayerModeSelect = (e) => {
    setPlayerMode(e.target.value.toString());
  };

  const handleStartButton = () => {
    setPlayGame(true);
    navigate('/gamepage');
  };

  return (
    <main className="min-w-[360px] max-w-[500px] min-h-screen max-h-screen overflow-hidden flex items-center justify-center px-5">
      <section className="bg-white px-3 py-5 rounded-md flex flex-col gap-y-8 shadow-md">
        <h1 className="text-4xl text-center text-sky-500">NORP HANGMAN GAME</h1>
        <div className="flex flex-col gap-y-3">
          <p className="text-xs">CHOOSE PLAYER MODE:</p>
          <select
            name="playerMode"
            className="w-full p-3 outline-none"
            onChange={handlePlayerModeSelect}
          >
            <option value={playerModes.single}>Single Player</option>
            <option value={playerModes.double}>Two Player</option>
          </select>
        </div>
        <button
          type="button"
          className="w-full bg-sky-400 p-1 text-white rounded-md text-xl"
          onClick={handleStartButton}
        >
          Start
        </button>
      </section>
    </main>
  );
};

export default HomePage;
