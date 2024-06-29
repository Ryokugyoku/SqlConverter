import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './CreateWiki.css';
interface CreateWikiProps {
    // Define your component's props here
    OnMenuClick:()=> void;
}

const CreateWiki: React.FC<CreateWikiProps> = (props) => {
    const [date] = useState(new Date().toISOString()); // 日付の状態
    const [text, setText] = useState(''); // テキストボックスの値の状態
    const [title, setTitle] = useState(''); // テキストボックスの値の状態
    const [uploading] = useState(false); // アップロード中かどうかの状態

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const saveData = () => {
        if(!text.trim() || !title.trim){
            return;
        }
        
        const dataToSave = { date, text, title, uploading};
    
        // IndexedDB データベースを開く
        const request = window.indexedDB.open('myDatabase', 1);
    
        request.onerror = (event) => {
            console.error('Database error:', event);
        };
    
        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains('wikiData')) {
                db.createObjectStore('wikiData', { keyPath: 'id', autoIncrement: true });
            }
        };
    
        request.onsuccess = (event) => {
            const db = request.result;
            const transaction = db.transaction('wikiData', 'readwrite');
            const store = transaction.objectStore('wikiData');
            const addRequest = store.add(dataToSave);
    
            addRequest.onsuccess = (event) => {
                console.log('Data saved to the database', event);
            };
    
            addRequest.onerror = (event) => {
                console.error('Error saving data', event);
            };

            props.OnMenuClick();
        };

        
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enterのデフォルトの動作を防ぐ
            const formElements = Array.from(document.querySelectorAll('input, textarea'));
            const currentIndex = formElements.indexOf(document.activeElement as Element);
            const nextElement = formElements[currentIndex + 1];
            if (nextElement) {
                (nextElement as HTMLElement).focus(); // 次の要素にフォーカスを移動
            }
        }
    };

    return (
        <div className='CreateWiki'>
            <div className='Editor'>
                <div className=''>Add Note</div>
                <input value={title} onChange={handleTitleChange} onKeyDown={handleKeyDown} className='TitleArea' placeholder='Title'/>
                <div className='InputBox'>
                    <textarea value={text} onChange={handleTextChange} className='TextInputArea'/>
                    <div className="markdown-preview">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {text}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
            <button onClick={saveData} className='SaveButton'><span>Save Data</span></button>
        </div>
    );
};

export default CreateWiki;