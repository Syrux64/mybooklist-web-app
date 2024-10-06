import BookCard from '../BookCard/BookCard.jsx'
import styles from './Community.module.css'

import { useState, useEffect } from 'react';
import axios from 'axios';


const Community = () => {
    const [postData, setPostData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/db/community`);
                setPostData(response.data);
            } catch (error) {
                console.log("Error fetching the data:", error);
            }
        };
        fetchData();
    }, []);

    // convert to readable time
    const convertTime = (rawDate) =>{
        let date = new Date(rawDate);
        let time = date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        date = date.toLocaleDateString() + " " + time;
        return date;
    }


    return(
        <div className={styles.section}>
        { postData && postData.map(post =>(
            <div className={styles.communityDiv}>
                <div>
                    <BookCard 
                        title={post.book.title}
                        cover={post.book.cover}
                        author={post.book.author}/>

                </div>
                <div className={styles.postContent}>
                    <div className={styles.userAbout}>
                        <div className={styles.username}>{post.user.name}</div>
                        <div className={styles.date}>{convertTime(post.postedDate)}</div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.status}>{post.status}</div>
                        <p>{post.thoughts}</p>
                    </div>
                </div>
            </div>

        ))
    }
    </div>
        
    )
}

export default Community;