import BookCard from "../BookCard/BookCard";
import styles from '../GenreCard/GenreCard.module.css'

import {useState, useEffect} from 'react';
import axios from 'axios';


const ViewAuthor = ({author}) =>{


    const [bookData, setBookData] = useState(null);

    useEffect(() =>{
        const fetchData = async () => {
            try{
                const response = await axios.get(`/api/view/author/${author}`);
                setBookData(response.data);
                console.log(response.data);
            } catch (error){
                console.log("Error fetching the data:", error);
            }
        };
        fetchData();
    }, [author]);

    return(
    <>
    <div>
        <p className={styles.resultName}> Results for {author}</p>
    </div>
     <div className={styles.genreDiv}>
                {bookData && bookData.slice(0, 40).map((book, index) => (
                    <BookCard
                        key={index}
                        cover={book.bookCover}
                        author={book.bookAuthor}
                        title={book.bookTitle}
                    />
                ))}
    </div>
    </>
    )

};

export default ViewAuthor;