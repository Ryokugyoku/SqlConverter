import React, {ChangeEvent, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import i18n from './locales/i18n';
import { useTranslation } from 'react-i18next';
import { handleFileCsvChange as originalHandleFileCsvChange ,ColumnsNum} from './csvUtils';

function App() {
  const { t } = useTranslation();

  const csvButtonRef = useRef<HTMLButtonElement>(null);
  const sqlButtonRef = useRef<HTMLButtonElement>(null);
  const csvSettingsRef = useRef<HTMLDivElement>(null);
  const csvColumnSettingRef = useRef<HTMLDivElement>(null);
  
  const [numColumns, setNumColumns] = useState<number>(ColumnsNum);

  const handleFileCsvChange = (e: ChangeEvent<HTMLInputElement>) => {
    originalHandleFileCsvChange(e);
    setTimeout(() => {
      setNumColumns(ColumnsNum); // ColumnsNumの値を設定
    }, 100); // 非同期処理のため少し待つ
    if(csvColumnSettingRef.current){
      const headerCheckbox = document.getElementById('HeaderCheckbox') as HTMLInputElement
      if(!headerCheckbox.checked){ 
        csvColumnSettingRef.current.style.display = '';
      }
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const csvColumnSetting = document.getElementById('CsvColumnSetting');
    if (csvColumnSetting) {
      if (e.target.checked) {
        csvColumnSetting.style.display = 'none';
      } else {
        if(ColumnsNum > 0){
          csvColumnSetting.style.display = '';
        }
        
      }
    }
  };

  const handleChangeTabColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 関数の内容
    const buttonId = e.currentTarget.id;
    if (buttonId === 'CsvButton' && csvButtonRef.current) {
      csvButtonRef.current.classList.add('Selected');
      if (sqlButtonRef.current) {
        sqlButtonRef.current.classList.remove('Selected');
        if (csvSettingsRef.current){
          csvSettingsRef.current.style.display = 'flex';

        }
        
      }
    } else if (buttonId === 'SqlButton' && sqlButtonRef.current) {
      sqlButtonRef.current.classList.add('Selected');
      if (csvButtonRef.current) {
        csvButtonRef.current.classList.remove('Selected');
        if (csvSettingsRef.current){
          csvSettingsRef.current.style.display = 'none';
        }
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const headerCheckbox = document.getElementById('HeaderCheckbox') as HTMLInputElement;
    const tableName = document.getElementById('TableName') as HTMLInputElement;
    if (!headerCheckbox.checked) {
      if (csvColumnSettingRef.current) {
        const inputs = csvColumnSettingRef.current.querySelectorAll('input');
        const values = Array.from(inputs).map(input => input.value);
        for (let i = 0; i < values.length; i++) {
          console.log(values[i]); // 取得した文字列を表示
        }
      }
    }
    console.log(tableName.value); // 取得した文字列を表示
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
              <button className='right' id='CsvButton' ref={csvButtonRef} onClick={handleChangeTabColor}>CSV</button>
              <button className='left' id='SqlButton' ref={sqlButtonRef} onClick={handleChangeTabColor}>SQL</button>
            </div>
            <div className='CsvSettings' ref={csvSettingsRef} >
              <label>{t('csvsettings')}</label>
              <div className='settingBox'>
                <input type="file" id="fileInput" accept=".csv" onChange={handleFileCsvChange}/> 
                <div className='CsvSettingsBox'>
                  <input type='checkbox' id='HeaderCheckbox' onChange={handleCheckboxChange}/>
                  <label htmlFor='Header'>{t('header')}</label>
                </div>
                <div id='CsvColumnSetting' className='CsvSettingsBox' style={{display:'none'}} ref={csvColumnSettingRef}>          
                  <label>{t('columnNamed')}</label>
                  {Array.from({ length: numColumns }).map((_, index) => (
                    <input key={index} type="text" placeholder={`Column ${index + 1}`} />
                  ))}
                </div>
                <div className='CsvSettingsBox'>
                  <label>{t('tableName')} :</label>
                  <input type='text' id='TableName' />
                </div>
                <div className='CsvSettingsBox'>
                  <label>{t('dbtype')} :</label>
                  <select>
                    <option value='mysql'>MySQL</option>
                    <option value='mssql'>MSSQL</option>
                    <option value='oracle'>Oracle</option>
                    <option value='postgresql'>PostgreSQL</option>
                    <option value='sqlite'>SQLite</option>
                  </select>
                </div>
                <button onClick={handleSubmit}> {t('convert')}</button>
              </div>
             
            </div>
            
          </div>
          
          <p>SQL Tools<br/> Create by Dokokano Maeda</p>

        </div>
      </header>
    </div>
  );
}

export default App;