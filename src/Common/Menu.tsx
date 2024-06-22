import React, { useState } from 'react';
import './Menu.css'; // CSS スタイルを適用
import Logo from  '../logo.svg';
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container" style={{ height: isOpen ? '20rem' : '5.5rem', transition: 'height 1s' }}>
      <img src={Logo} className='HumburgerLogo' alt="logo" />
      <div className="menu-button" onClick={toggleMenu}>
        {isOpen ? '×' : '＝'}
      </div>
      {isOpen && (
        <div className="menu-items">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      )}
    </div>
  );
};

export default Menu;