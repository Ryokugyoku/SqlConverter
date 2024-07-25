import React, { ChangeEvent, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import i18n from './locales/i18n';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  const csvButtonRef = useRef<HTMLButtonElement>(null);
  const sqlButtonRef = useRef<HTMLButtonElement>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      console.log(e.target?.result);
    };

    reader.readAsText(file);
  };

  const handleChangeTabColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 関数の内容
    const buttonId = e.currentTarget.id;
    if (buttonId === 'CsvButton' && csvButtonRef.current) {
      csvButtonRef.current.classList.add('Selected');
      if (sqlButtonRef.current) {
        sqlButtonRef.current.classList.remove('Selected');
      }
    } else if (buttonId === 'SqlButton' && sqlButtonRef.current) {
      sqlButtonRef.current.classList.add('Selected');
      if (csvButtonRef.current) {
        csvButtonRef.current.classList.remove('Selected');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='Contents'>
          <div className='LangBox'>
            <label>{t('changeLanguage')}</label>
            <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
              <option value="ja">{t('japanese')}</option>
              <option value="en">{t('english')}</option>
              <option value="es">{t('espanol')}</option>
            </select>
          </div>
          <h1>{t('ApplicationTitle')}</h1>
          <div className='Options'>
            <div className='Tab'>
              <button className='right' id='CsvButton' ref={csvButtonRef} onClick={handleChangeTabColor}>{t('csv')}</button>
              <button className='left' id='SqlButton' ref={sqlButtonRef} onClick={handleChangeTabColor}>{t('sql')}</button>
            </div>
            <input type="file" id="fileInput" accept=".csv,.sql" onChange={handleFileChange}/> 
          </div>
          
          <p>SqlConverterProject 2024</p>
        </div>
      </header>
    </div>
  );
}

export default App;