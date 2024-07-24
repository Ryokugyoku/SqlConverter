import React,{ useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './locales/i18n'
import { useTranslation } from 'react-i18next'; // 1. useTranslationフックをインポート

function App() {
 const { t } = useTranslation(); // 2. useTranslationを使用して翻訳関数tを取得
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{t('welcome')}</h1> {/* 3. t関数を使って翻訳 */}
        <p>
           SqlConverterProject 2024
        </p>
      </header>
    </div>
  );
}

export default App;
