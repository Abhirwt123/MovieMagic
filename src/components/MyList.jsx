import React, { useEffect, useState } from 'react';
import SliderComp from './Slider';
import MovieCard from './MovieCard';
import { Client, Databases, Query, ID } from "appwrite";

const MyList = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const client = new Client()
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("65f9677db27078162d8c");
        const databases = new Databases(client);
        databases.listDocuments('65f967ac48b508702782', '65f96fc008ce0a6b0ccc')
            .then(response => {
                setMovies(response.documents);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    movies.map((movie) => console.log(JSON.parse(movie.movieInfo)));
    if (movies === null) return;
    return (
        <div className='slider-container'>
            <h1 className='text-4xl text-white mb-4'>My List</h1>
            <SliderComp>
                {movies.map((movie) => <MovieCard key={JSON.parse(movie.movieInfo).id} info={JSON.parse(movie.movieInfo)} />)}
            </SliderComp>
        </div>
    );
};

export default MyList;
