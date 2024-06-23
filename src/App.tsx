import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Common/Menu';

function App() {
  // メニュー名に応じた処理を行うhandleSideMenuClick関数を更新
  const handleSideMenuClick = (menuName: string) => {
    // ここでmenuNameに応じた処理を実装
    console.log(`${menuName} menu clicked`);
    // 例: 'Home'がクリックされた場合の処理を追加
    if (menuName === 'Home') {
      console.log('Home menu processing...');
      // Homeメニューがクリックされた時の処理をここに記述
    }
    // 他のメニュー名に応じた処理も同様に追加可能
  };

  return (
    <div className="App">
      <header className="App-header">
        <Menu onMenuClick={handleSideMenuClick} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
           My  Wiki Project @2024 MM
        </p>
      </header>
    </div>
  );
}

export default App;
