import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Table } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <img src={logo} className="App-logo" alt="logo" />
        <Table type='arrival' iataCode='LIM'/>
      </header>
      
      
    </div>
  );
}

export default App;
