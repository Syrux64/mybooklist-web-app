import styles from './AddBook.module.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

const AddBook = ({ title, user }) => {
    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/view/book/${title}`);
                setBookData(response.data);
            } catch (error) {
                console.log("Error fetching the data:", error);
            }
        };
        fetchData();
    }, [title]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const score = parseInt(document.getElementById('score').value);
        const status = document.getElementById('status').value;
        const thoughts = document.getElementById('thoughts').value;

        fetch('/db/submit/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, bookData, status, score, thoughts ,email:user.email})
        })
        .then(response => {
            if (response.ok) {
                window.location = '/home';
            } else {
                throw new Error('Error creating post');
            }
        })
        .catch(error => {
            console.error('Error retrieving post:', error);
        });

    };

    return (
        <>
            {bookData && (
                <div className={styles.addBook}>
                    <div className={styles.bookInfo}>
                        <div className="book-cover">
                            <img src={bookData.bookCover} alt="Book cover" />
                        </div>
                        <div className={styles.authors}>
                            <p>{bookData.bookAuthor}</p>
                        </div>
                        <div className={styles.title}>
                            <p>{bookData.bookTitle}</p>
                        </div>
                    </div>
                    <div className={styles.input}>
                        <form className={styles.inputData} id="inputData" onSubmit={handleSubmit}>
                            <div className={styles.scoreInput}>
                                <label htmlFor="score">Score</label>
                                <select id="score">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div className={styles.statusInput}>
                                <label htmlFor="status">Status</label>
                                <select id="status">
                                    <option value="plan to read">Plan to read</option>
                                    <option value="completed">Completed</option>
                                    <option value="reading">Reading</option>
                                    <option value="hold">On-Hold</option>
                                    <option value="dropped">Dropped</option>
                                </select>
                            </div>
                            <div>
                                <textarea id="thoughts" name="thoughts" placeholder="Thoughts" cols="45" rows="5"></textarea>
                            </div>
                            <div className={styles.buttonSubmit}>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddBook;
