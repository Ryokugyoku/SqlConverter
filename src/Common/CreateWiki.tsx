import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './CreateWiki.css';
interface Props {
    // Define your component's props here
}

const CreateWiki: React.FC<Props> = () => {
    const [date] = useState(new Date().toISOString()); // 日付の状態
    const [text, setText] = useState(''); // テキストボックスの値の状態
    const [title, setTitle] = useState(''); // テキストボックスの値の状態

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const saveData = () => {
        const dataToSave = { date, text, title};
        localStorage.setItem('myData', JSON.stringify(dataToSave));
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