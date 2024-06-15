//import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Menu from "./pages/Menu.js"
import Admin from "./pages/Admin.js"
import Login from "./pages/Login.js"
import Contact from './pages/Contact.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/menu" exact element={<Menu/>}/>
          <Route path="/admin" exact element={<Admin/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/contact" exact element={<Contact/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
