import React from 'react';

const HomePage = () => {
  return (
    <main className="min-w-[360px] max-w-[500px] min-h-screen max-h-screen overflow-hidden flex items-center justify-center px-5">
      <section className="bg-white px-3 py-5 rounded-md flex flex-col gap-y-8 shadow-md">
        <h1 className="text-4xl text-center text-sky-500">NORP HANGMAN GAME</h1>
        <div className="flex flex-col gap-y-3">
          <p className="text-xs">CHOOSE PLAYER MODE:</p>
          <select name="playerMode" className="w-full p-3 outline-none">
            <option value="single">Single Player</option>
            <option value="double">Two Player</option>
          </select>
        </div>
        <button
          type="button"
          className="w-full bg-sky-400 p-1 text-white rounded-md text-xl"
        >
          Start
        </button>
      </section>
    </main>
  );
};

export default HomePage;
