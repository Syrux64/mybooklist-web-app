import styles from './BookCard.module.css';

const BookCard = ({ cover, author, title }) => {
    const viewBook = () =>{ 
        window.location = `/view/book/${title}`
    }

    const viewAuthorBooks = (author) => {
        window.location = `/view/author/${author}`
    }
    

    return (
        <div className={styles.bookCard}>
            <div className={styles.bookCardDiv}>
                <div className={styles.cover}>
                    <img src={cover} alt="Book cover" onClick={viewBook}/>
                </div>
                <div className={styles.author} onClick={ () => viewAuthorBooks(author)}>
                    <p>{author}</p>
                </div>
                <div className={styles.title}>
                    <p onClick={viewBook}>{title}</p>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
