import { useEffect, useState } from 'react'
import { API_OPTIONS, TMDB_URLS } from '../utils/constant'
import MovieCard from './MovieCard';
import Header from './Header';
import { useSelector } from 'react-redux';
import Footer from './Footer';

const SearchMovies = () => {
    const [searchDataList, setSearchDataList] = useState()
    const searchText = useSelector((store) => store.app.searchText)
    const fetchMovies = async () => {
        const data = await fetch(`${TMDB_URLS.searchMovieUrl/searchText}`, API_OPTIONS);
        const json = await data.json();
        setSearchDataList(json.results)
    }
    useEffect(() => {
        fetchMovies()
    }, [searchText]);
    if (!searchDataList) return;
    console.log(searchDataList)

    return (
        <>
            <Header />
            <div className='flex gap-4 flex-wrap px-20 py-20 min-h-screen'>
                {searchDataList.map((movie) => <MovieCard key={movie.id} info={movie} />)}
            </div>
            <Footer />
        </>
    )

};
export default SearchMovies;
