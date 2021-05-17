import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import RegisterPage from './components/RegisterPage';

const App = () => {


  return (
    <div className='App'>
      <Header />
      <RegisterPage />
    </div>
  );
}

export default App;
