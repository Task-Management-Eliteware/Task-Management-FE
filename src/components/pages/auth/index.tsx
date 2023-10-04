import React, { FC, useState, ReactNode } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { routes, useAppSelector } from 'shared';
import Login from './Login';
import SignUp from './Singup';

const Auth = () => {
  const { pathname } = useLocation();

  const { token } = useAppSelector((state) => state.authSlice);

  let page = {
    element: <Login />,
    link: routes.SIGNUP as string,
    linkTitle: 'Already have an Account? Sign Up',
  };
  if (pathname === routes.SIGNUP) {
    page = {
      element: <SignUp />,
      link: routes.LOGIN,
      linkTitle: 'Login',
    };
  }

  if (token) {
    return <Navigate to={routes.TASKS} />;
  }

  return (
    <div className="mt-5 p-5 card">
      <div className="d-flex justify-content-center align-items-center">
        <div>{page.element}</div>
      </div>
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <Link to={page.link}> {page.linkTitle} </Link>
      </div>
    </div>
  );
};

export default Auth;
