import React, { useState } from 'react';
import './CreateWiki.css';
interface Props {
    // Define your component's props here
}

const CreateWiki: React.FC<Props> = () => {
    const [date, setDate] = useState(''); // 日付の状態
    const [text, setText] = useState(''); // テキストボックスの値の状態

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const saveData = () => {
        const dataToSave = { date, text };
        localStorage.setItem('myData', JSON.stringify(dataToSave));
    };

    return (
        <div className='CreateWiki'>
            <input type="date" value={date} onChange={handleDateChange} />
            <div className='Editor'>
                <div className="toggle-button-cover">
                    <div id="button-3" className="button r">
                    <input className="checkbox" type="checkbox"/>
                    <div className="knobs"></div>
                    <div className="layer"></div>
                    </div>
                </div>
                <textarea value={text} onChange={handleTextChange} className='TextInputArea'/>
            </div>
            <button onClick={saveData}>Save Data</button>
        </div>
    );
};

export default CreateWiki;