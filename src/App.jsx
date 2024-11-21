import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import WordInput from './components/WordInput';
import GamePage from './pages/GamePage';
import GameContextProvider, {
  getContextValues,
} from './context/GameContextProvider';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: '/gamepage',
          element: <GamePage />,
        },
      ],
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
