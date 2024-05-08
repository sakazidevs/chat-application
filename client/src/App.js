import React from 'react';
import './App.css';
import User1 from './Components/User1';
import User2 from './Components/User2';

function App() {
  return (
    <div className="app-container">
      <div className="user1-container">
        <User1 />
      </div>
      <div className="user2-container">
        <User2 />
      </div>
    </div>
  );
}

export default App;