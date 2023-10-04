import React, { FC, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'shared';
import { routes } from 'shared/constant';
import Header from './Header';

export const Layout: FC = () => {
  const { token } = useAppSelector((state) => state.authSlice);

  if (!token) {
    return <Navigate to={routes.LOGIN} />;
  }

  return (
    <div className="page">
      <Header />
      <Outlet />
    </div>
  );
};
