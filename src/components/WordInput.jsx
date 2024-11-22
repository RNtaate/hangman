import React, { useState } from 'react';
import { getContextValues } from '../context/GameContextProvider';

const WordInput = () => {
  const { setDoublePlayerWordChoice } = getContextValues();
  const [wordInput, setWordInput] = useState('');

  const handleInputChange = (ev) => {
    let writtenWord = ev.target.value.trim();
    if (writtenWord.length >= 3 && writtenWord.length <= 15) {
      setWordInput(writtenWord.toUpperCase());
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (wordInput) {
      setDoublePlayerWordChoice(wordInput);
    }
  };

  return (
    <section className="absolute top-0 right-0 bottom-0 left-0 bg-slate-900/[0.6] flex justify-center items-center px-5">
      <div className="bg-white shadow-2xl rounded-md">
        <form
          className="flex flex-col px-3 gap-y-4 py-8"
          onSubmit={handleSubmit}
        >
          <label htmlFor="word" className="text-sm text-center text-slate-600">
            Player one, enter a word between 3 and 15 letters long:
          </label>
          <input
            type="text"
            id="word"
            placeholder="Enter your word here"
            autoComplete="off"
            maxLength={15}
            minLength={3}
            className="outline-none border-b border-slate-400 py-2 caret-slate-400"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-sky-400 p-1 text-white rounded-md text-xl"
          >
            Go
          </button>
        </form>
      </div>
    </section>
  );
};

export default WordInput;
