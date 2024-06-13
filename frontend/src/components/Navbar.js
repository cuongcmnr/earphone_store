import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Reorder from '../assets/reorder.svg';
import login from '../assets/login.svg';
import "../styles/Navbar.css";


function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const sidebarRef = useRef();

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowLinks(false);
      setShowProductDropdown(false);
      setShowBrandDropdown(false);
    }
  };

  useEffect(() => {
    if (showLinks) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLinks]);

  return (
    <div className={`navbar ${showLinks ? 'active' : ''}`}>
      <div className="leftSide">
        <button onClick={() => setShowLinks(!showLinks)}>
          <img src={Reorder} alt="Reorder" style={{ width: 20, height: 20 }}/>
        </button>
        <Link to="/" className='FuturaLight'>Menu</Link>
      </div>
      <div className="menuSide">
        {/* Left side content */}
      </div>
      {showLinks && (
        <div className="menuOverlay" ref={sidebarRef}>
          <div className="menuContent">
            <Link to="/new" className='FuturaMedium' onClick={() => setShowLinks(false)}>New</Link>
            
            <div className="dropdown">
              <div className="dropdown-header" onClick={() => setShowProductDropdown(!showProductDropdown)}>
                Our Product
              </div>
              {showProductDropdown && (
                <div className="dropdown-content">
                  <Link to="/product1" onClick={() => setShowLinks(false)}>2022 Collection</Link>
                  <Link to="/product2" onClick={() => setShowLinks(false)}>2023 Collection</Link>
                  <Link to="/product3" onClick={() => setShowLinks(false)}>2024 Collection</Link>
                </div>
              )}
            </div>
            
            <div className="dropdown">
              <div className="dropdown-header" onClick={() => setShowBrandDropdown(!showBrandDropdown)}>
                Brand
              </div>
              {showBrandDropdown && (
                <div className="dropdown-content">
                  <Link to="/brand1" onClick={() => setShowLinks(false)}>Xiaomi</Link>
                  <Link to="/brand2" onClick={() => setShowLinks(false)}>Sony</Link>
                  <Link to="/brand3" onClick={() => setShowLinks(false)}>AKG</Link>
                </div>
              )}
            </div>

            
            <Link to="/contact" className='FuturaMedium' onClick={() => setShowLinks(false)}>About & Contact us</Link>
            <Link to="/admin" className='FuturaMedium' onClick={() => setShowLinks(false)}>Admin</Link>
          </div>
        </div>
      )}

      <div className="middleSide">
        <Link to="/menu" className='FuturaMedium'>HEADPHONE</Link>
      </div>

      <div className="rightSide">
        <Link to="/contact" className='FuturaLight'> Contact us</Link>
        <Link to="/login" >
        <img src={login} alt="login" style={{ width: 20, height: 20 }} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
