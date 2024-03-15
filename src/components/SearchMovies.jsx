import { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constant'
import MovieCard from './MovieCard';
import Header from './Header';
import { useSelector } from 'react-redux';

const SearchMovies = () => {
    const [searchDataList, setSearchDataList] = useState()
    const searchText =useSelector((store)=>store.app.searchText)
    const fetchMovies = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchText}`, API_OPTIONS);
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
        <Header/>
        <div className='flex gap-4 flex-wrap px-20 py-20 min-h-screen'>
            {searchDataList.map((movie) => <MovieCard key={movie.id} info={movie} />)}
        </div>
        </>
    )

};
export default SearchMovies;
