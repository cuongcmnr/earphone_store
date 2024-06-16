//import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Menu from "./pages/Menu.js"
import Admin from "./pages/Admin.js"
import Login from "./pages/Login.js"
import Contact from './pages/Contact.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Popup from './components/Popup.js'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function App() {
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(()=>{
    const popupClosed = Cookies.get('popupClosed');
    if (!popupClosed) {
      setTimeout(() => {
        setTimedPopup(true);
      }, 60000);
    }
  }, []);

  const handlePopupClose = () => {
    setTimedPopup(false);
    Cookies.set('popupClosed', 'true', { expires: 1 }); // Expires in 1 day
  };

  return (
    <div className="App">

      <Popup trigger={timedPopup} setTrigger={handlePopupClose}>
          <h3>Xiaomi Mi Comport</h3>
          <p>1.100.000đ</p>
      </Popup>

      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/menu" exact element={<Menu/>}/>
          <Route path="/admin" exact element={<Admin/>}/>
          
          <Route path="/contact" exact element={<Contact/>}/>
          <Route path="/login" exact element={<Login/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
