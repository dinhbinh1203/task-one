import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const UserRoute = () => {
  const currentUser = JSON.parse(localStorage.getItem('current-user'));
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
