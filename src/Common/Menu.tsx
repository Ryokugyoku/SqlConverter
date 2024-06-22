import React, { useState } from 'react';
import './Menu.css'; // CSS スタイルを適用
import Logo from  '../logo.svg';
import Home from '../Image/Home.svg';
import NoteAdd from '../Image/NoteAdd.svg';
import EditNote from '../Image/EditNote.svg';
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container" style={{ height: isOpen ? '14rem' : '5.5rem', transition: 'height 0.5s' }}>
      <img src={Logo} className='HumburgerLogo' alt="logo" />
      <div className="menu-button" onClick={toggleMenu}>
        {isOpen ? '×' : '＝'}
      </div>
      {isOpen && (
        <div className="menu-items">
          <img src={Home} className='SideMenuImage' alt='Home'/>
          <img src={NoteAdd} className='SideMenuImage' alt='NoteAdd'/>
          <img src={EditNote} className='SideMenuImage' alt='EditNote'/>
        </div>
      )}
    </div>
  );
};

export default Menu;