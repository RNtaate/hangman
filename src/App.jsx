import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import WordInput from './components/WordInput';
import GamePage from './pages/GamePage';
import GameContextProvider from './context/GameContextProvider';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/gamepage',
      element: <GamePage />,
    },
  ]);

  return (
    <GameContextProvider>
      <div className="min-w-[360px] max-w-[500px] relative min-h-screen max-h-screen overflow-hidden">
        <RouterProvider router={router} />
      </div>
    </GameContextProvider>
  );
}

export default App;
