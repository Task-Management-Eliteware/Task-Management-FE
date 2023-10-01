import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '@tabler/core/dist/css/tabler.min.css';
import { Layout } from 'components/common';
import Login from 'components/pages/auth/Login';
import Task from 'components/pages/task';
import { routes } from 'shared/constant';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.TASKS} element={<Layout />}>
          <Route index element={<Task />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
