import React from 'react';
import './Home.css'; // CSS スタイルを適用
interface Props {
    // Define your component's props here
}

const Home: React.FC<Props> = () => {
    return (
        <div className='Home'>
            <div className='Content'>
                <div className='Post'>
                    <h1>Wiki Title</h1>
                    <div className='PostDate'>2023/04/15</div>
                    <h2>Wiki Description</h2>
                    <div className='Tags'>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;