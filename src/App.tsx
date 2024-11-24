import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './Components/UserList';
import UserProfile from './Components/UserProfile';
import Header from './Components/Header';
import LoginForm from './Components/LoginFort';

const App: React.FC = () => {
  return (
    <Router>
      <div className='min-h-screen bg-custom-pattern bg-cover bg-center bg-fixed'>
        <Header logoSrc='/assets/logo_qred.png' logoAlt='Qred Logo' />
        <Routes>
          <Route path='/users' element={<UserList />} />
          <Route path='/user/:id' element={<UserProfile />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
