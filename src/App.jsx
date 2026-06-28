import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { useState } from "react";
import Nav from './components/Nav';
import Stars from './components/Stars';
import Facts from './components/Facts';
import Wisp from './components/Wisp';

import Home from './pages/Home';
import './styles/App.css'

function App() {
  const [starsEnabled, setStarsEnabled] = useState(true);
  const [factsEnabled, setFactsEnabled] = useState(true);

  return (
    <div className="app">
      <Nav />
      {starsEnabled && <Stars />}
      <Facts factsEnabled={factsEnabled}/>
      <Home />
      <Wisp 
        starsEnabled={starsEnabled}
        setStarsEnabled={setStarsEnabled}
        factsEnabled={factsEnabled}
        setFactsEnabled={setFactsEnabled}
      />
    </div>
  );
}

export default App;


          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}