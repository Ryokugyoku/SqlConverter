import React,{ useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Common/Menu';
import Home from './Common/Home';

function App() {
  
  const [selectedMenu, setSelectedMenu] = useState<string>('Home');
  // メニュー名に応じた処理を行うhandleSideMenuClick関数を更新
  const handleSideMenuClick = (menuName: string) => {
    // ここでmenuNameに応じた処理を実装
    setSelectedMenu(menuName);
    // 他のメニュー名に応じた処理も同様に追加可能
  };
  const renderContent = () => {
    switch (selectedMenu) {
      case 'Home':
        return <Home />;
      // 他のメニュー項目に応じたコンポーネントをここに追加
      default:
        return <p>選択されたメニュー項目に対応するコンポーネントがありません。</p>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Menu onMenuClick={handleSideMenuClick} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
           My  Wiki Project @2024 MM
        </p>
        {renderContent()}
      </header>
    </div>
  );
}

export default App;
