import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import QuoteContainer from './component/QuoteContainer';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#445b0bd9');
  const changeBackgroundColor = () => {
    // Generate a random color for demonstration purposes
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(newColor);
  };
  return (
    <div className="App" style={{backgroundColor}}>
     <QuoteContainer changeBackgroundColor={changeBackgroundColor} backgroundColor={backgroundColor}/>
     <div className="founder">by Rohan Negi <span><FontAwesomeIcon icon={faHeart} /></span></div>
    </div>
  );
}

export default App;
