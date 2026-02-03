import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

import Tasks from './Pages/Tasks';
import Personal from './Pages/Personal';
import Work from './Pages/Work';
import Shopping from './Pages/Shopping';
import Study from './Pages/Study';
import Other from './Pages/Other';
import Addtasks from './Pages/Addtasks';
import Edittask from './Pages/Edittask';

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addtask" element={<Addtasks />} />
        <Route path="/edittask/:id" element={<Edittask />} />

        {/* TASKS LAYOUT ROUTE */}
        <Route path="/tasks" element={<Tasks />}>
          {/* default route */}
          <Route index element={<Navigate to="personal" />} />

          <Route path="personal" element={<Personal />} />
          <Route path="work" element={<Work />} />
          <Route path="shopping" element={<Shopping />} />
          <Route path="study" element={<Study />} />
          <Route path="others" element={<Other />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
