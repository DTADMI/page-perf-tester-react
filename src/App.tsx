import React, { Component } from 'react';
import UrlSearch from './components/UrlSearch';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <UrlSearch url="https://www.voici.fr/">

      </UrlSearch>
    </div>
  );
}

export default App;
