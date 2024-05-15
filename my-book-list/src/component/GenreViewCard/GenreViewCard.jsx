import BookCard from "../BookCard/BookCard";
import styles from '../GenreCard/GenreCard.module.css'

import { useState, useEffect } from 'react';
import axios from 'axios';

const GenreViewCard = ({genre}) => {

    const goToGenre = (genreName) => {
        window.location = `/view/genre/${genreName}`;
        console.log(genreName)
    }

    const [bookData, setBookData] = useState(null);

    useEffect(() =>{
        const fetchData = async () => {
            try{
                const response = await axios.get(`/api/view/genre/${genre}`);
                setBookData(response.data);
            } catch (error){
                console.log("Error fetching the data:", error);
            }
        };
        fetchData();
    }, [genre]);

    return(
        <>
            <div>
                <p className={styles.genreName} onClick={() => goToGenre(genre)}>{genre}</p>
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

}


export default GenreViewCard;