import { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import WordInput from './components/WordInput';

function App() {
  return (
    <div className="min-w-[360px] max-w-[500px] relative min-h-screen max-h-screen overflow-hidden">
      <HomePage />
      <WordInput />
    </div>
  );
}

export default App;
