
import React ,{useState, useEffect}  from 'react';
import './Home.css'; // CSS スタイルを適用
interface Props {
    // Define your component's props here
}



const Home: React.FC<Props> = () => {

    interface Post {
        date: string;
        text: string;
        title: string;
      }

    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = () => {
        // IndexedDB データベースを開く
        const request = window.indexedDB.open('myDatabase', 1);
      
        request.onerror = (event) => {
          console.error('Database error:', event);
        };
      
        request.onsuccess = (event) => {
          const db = request.result;
          // 'wikiData' オブジェクトストアでの読み取り専用トランザクションを開始
          const transaction = db.transaction('wikiData', 'readonly');
          const store = transaction.objectStore('wikiData');
          // オブジェクトストア内のすべてのレコードを取得
          const getAllRequest = store.getAll();
      
          getAllRequest.onsuccess = (event) => {
            if (getAllRequest.result.length > 0) {
              console.log('All data retrieved:', getAllRequest.result);
              setPosts(getAllRequest.result);
            } else {
              console.log('No data found');
            }
          };
      
          getAllRequest.onerror = (event) => {
            console.error('Error retrieving all data:', event);
          };
        };
      };
    

    return (
        <div className='Home'>
            <div className='Content'>
            {posts.map((post, index) => (
                    <div key={index} className='Post'>
                        <h1>{post.title}</h1>
                        <div className='PostDate'>{post.date}</div>
                        <h2>{post.text}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;