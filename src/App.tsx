import React from 'react';
import './App.css';
import { Greet } from '@components/Greet';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Greet />
    </div>
  );
}

export default App;
