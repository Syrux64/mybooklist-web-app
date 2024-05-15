import GenreCard from "../GenreCard/GenreCard";
import lodash from 'lodash'

let genres = [
    'Fiction',
    'Mystery',
    'Romance',
    'Science fiction',
    'Fantasy',
    'Horror',
    'Thriller',
    'Biography',
    'History',
    'Self-help',
    'Travel',
    'Cooking',
    'Art',
    'Religion',
    'Philosophy',
    'Psychology',
    'Business',
    'Economics',
    'Education'
]

genres = lodash.shuffle(genres);
const genreCards = genres.map((genre => (
    <GenreCard key={genre} genre={genre}></GenreCard>
)))

const Home = () => {
    return(
    <>
        {genreCards}
    </>
    )
}

export default Home;