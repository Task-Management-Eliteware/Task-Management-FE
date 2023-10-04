import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout, PageNotFound } from 'components/common';
import Auth from 'components/pages/auth';
import Task from 'components/pages/task';
import { routes } from 'shared/constant';
import './shared/scss/index.scss';

const App = () => {
  return (
    <div className="App h-100 container">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path={routes.SIGNUP} element={<Auth />} />
        <Route path={routes.LOGIN} element={<Auth />} />
        <Route path={routes.TASKS} element={<Layout />}>
          <Route index element={<Task />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
