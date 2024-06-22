import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Common/Menu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
           My  Wiki Project @2024 MM
        </p>
      </header>
    </div>
  );
}

export default App;
