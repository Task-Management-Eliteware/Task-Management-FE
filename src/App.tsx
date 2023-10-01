import React, { useState } from 'react';
import '@tabler/core/dist/css/tabler.min.css';
import Login from 'components/pages/auth/Login';
import Task from 'components/pages/task';

const App = () => {
  return (
    <div className="App">
      <Login />
      <Task />
    </div>
  );
};

export default App;
