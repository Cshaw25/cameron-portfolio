import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Stars from './components/Stars';
import Facts from './components/Facts';

import Home from './pages/Home';
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <Nav />
      <Stars />
      <Facts />
      <Home />
    </div>
  );
}

export default App;


          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}