import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import AI from './components/AI/AI';
import SignupLogin from './components/Login/SignupLogin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWithSidebarAndMain />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/auth" element={<SignupLogin />} />
      </Routes>
    </Router>
  );
};

const LayoutWithSidebarAndMain = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
