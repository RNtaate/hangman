import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getContextValues } from '../context/GameContextProvider';

const PrivateRoute = () => {
  const { playGame } = getContextValues();
  return <>{playGame ? <Outlet /> : <Navigate to={'/'} replace={true} />}</>;
};

export default PrivateRoute;
