import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import Routes from './Routes';

import './styles/global.css'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
