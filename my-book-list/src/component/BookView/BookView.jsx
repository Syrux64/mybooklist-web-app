import styles from './BookView.module.css'

import { useState, useEffect } from 'react';
import axios from 'axios';

const BookView = ({title}) => {
    
    const addBook = () => {
        window.location = `/addbook/${title}`;
    }

    const [bookData, setBookData] = useState(null);

    useEffect(() =>{
        const fetchData = async () => {
            try{
                const response = await axios.get(`/api/view/book/${title}`);
                setBookData(response.data);
            } catch (error){
                console.log("Error fetching the data:", error);
            }
        };
        fetchData();
    }, [title]);


    return(
        <>
        {bookData && (
            
            <><div class={styles.names}>
                    <div class={styles.authors}>
                        <p>{bookData.bookAuthor}</p>
                    </div>
                    <div class={styles.title}>
                        <p>{bookData.bookTitle}</p>
                    </div>
                    </div>
                    <div class={styles.bookDiv}>
                        <div class={styles.leftSideBar}>
                            <div class={styles.bookCover}>
                                <img src={bookData.bookCover} alt="book cover" />
                            </div>
                            <div class={styles.addList} onClick={addBook}>
                                <button>+ List</button>
                            </div>
                        </div>

                        <div class={styles.contents}>
                            <div class={styles.details}>
                                <div class={styles.score}>
                                    <div class={styles.scoreTitle}>
                                        <p>SCORE</p>
                                    </div>
                                    <p class={styles.scoreRating}>
                                        {bookData.bookRating}
                                    </p>
                                </div>

                                <div class={styles.publishedDiv}>
                                    <div class={styles.publishedDateTitle}>
                                        <p>Published On</p>
                                    </div>
                                        <p>{bookData.bookPublishedDate}</p>
                                    <div>

                                </div>
                                </div>

                                <div class={styles.publishedDiv}>
                                    <div class={styles.publishedDateTitle}>
                                        <p>Publisher</p>
                                    </div>
                                    <div class={styles.publisher}>
                                        <p>{bookData.bookPublisher}</p>
                                    </div>

                                </div>

                                <div class={styles.publishedDiv}>
                                    <div class={styles.publishedDateTitle}>
                                        <p>ISBN 10</p>
                                    </div>
                                    <div class="ISBN-10">
                                        <p>{bookData.isbn10}</p>
                                    </div>

                                </div>

                                <div class={styles.publishedDiv}>
                                    <div class={styles.publishedDateTitle}>
                                        <p>ISBN 13</p>
                                    </div>
                                    <div class="ISBN-13">
                                        <p>{bookData.isbn13}</p>
                                    </div>

                                </div>

                            </div>

                            <div class={styles.synopsisDiv}>
                                <p>Description</p>
                            </div>


                            <div class={styles.description}>
                                <p>{bookData.bookDescription}</p>
                            </div>
                        </div>

                    </div></>
        )
        }
        </>
        
    )
}

export default BookView;