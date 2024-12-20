import React, { useState, useRef } from 'react';
import { getContextValues } from '../context/GameContextProvider';

const WordInput = ({ incomingError = '' }) => {
  const { setDoublePlayerWordChoice } = getContextValues();
  const [wordInput, setWordInput] = useState('');
  const [wordError, setWordError] = useState(incomingError);
  const [reveal, setReveal] = useState(false);

  const inputRef = useRef();
  const spanRef = useRef();

  const handleInputChange = (ev) => {
    let writtenWord = ev.target.value.trim();
    let regex = /^[A-Za-z]{3,15}$/;
    if (regex.test(writtenWord)) {
      setWordInput(writtenWord.toUpperCase());
      setWordError('');
    } else {
      setWordInput('');
    }
  };

  const handleRevealingWord = () => {
    if (inputRef.current) {
      if (reveal) {
        inputRef.current.classList.add('text-change');
      } else {
        inputRef.current.classList.remove('text-change');
      }
      setReveal(!reveal);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (wordInput) {
      setDoublePlayerWordChoice(wordInput);
    } else {
      setWordError(
        'Word must have 3 to 15 letters without any spaces, numbers, or special characters.'
      );
    }
  };

  return (
    <section className="absolute top-0 right-0 bottom-0 left-0 bg-slate-900/[0.6] flex justify-center items-center px-5">
      <div className="bg-white shadow-2xl rounded-md px-3 pb-4 flex flex-col max-w-[360px]">
        <form
          className="flex flex-col gap-y-4 py-8"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label htmlFor="word" className="text-sm text-center text-slate-600">
            Player one, enter a word between 3 and 15 letters long:
          </label>
          <div className="bg-red-400 relative">
            <input
              type="text"
              id="word"
              ref={inputRef}
              placeholder="Enter your word here"
              autoComplete="off"
              maxLength={15}
              minLength={3}
              className="text-change outline-none border-b border-slate-400 py-1 caret-slate-400 px-3 inline-block w-full"
              onChange={handleInputChange}
            />
            <span
              ref={spanRef}
              className="absolute right-0 px-2 top-0 bottom-0 flex items-center cursor-pointer text-xs text-sky-300 select-none"
              onClick={handleRevealingWord}
            >
              {reveal ? 'HIDE' : 'SHOW'}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-400 p-1 text-white rounded-md text-xl"
          >
            Go
          </button>
        </form>
        {wordError && (
          <div className="text-red-500 text-sm text-center">{wordError}</div>
        )}
      </div>
    </section>
  );
};

export default WordInput;
