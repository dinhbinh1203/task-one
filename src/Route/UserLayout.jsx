import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const UserLayout = () => {
  const currentUser = JSON.parse(localStorage.getItem('current-user'));
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
