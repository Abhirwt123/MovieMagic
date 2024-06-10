export const API_KEY = 'afde3f9f7fc04f5186572e7555a2bccd';

export const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchApiDAta = async (endpoint) => {
    try {
        const data = await fetch(BASE_URL + endpoint);
        const json = await data.json()
        return json;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzgyOWFmZDUxMWIwYWJiNDY4OTM3ZDBjOTA1NTI0ZiIsInN1YiI6IjY1YTIwOWFhMjU4ODIzN2NmMjM2ZmM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IUYPRn3o7wMONBEKdd-r_vBt-DH0ks6NUmnQMMMbZVQ",
    }
};
export const PROFILE_ICON = "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1706940984~exp=1706941584~hmac=0f17fdc619b325b039d70acdff06346a14a5dd913004bbdb7f69240444fd689c";
export const DUMMY_MOVIE_POSTER = 'https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg?s=612x612&w=0&k=20&c=4X-znbt02a8EIdxwDFaxfmKvUhTnLvLMv1i1f3bToog=';


export const TMDB_URLS = {
    nowPlayingMoviesUrl: 'https://api.themoviedb.org/3/movie/now_playing',
    upcomingMoviesUrl: 'https://api.themoviedb.org/3/movie/upcoming',
    topRatedMoviesUrl: 'https://api.themoviedb.org/3/movie/top_rated',
    upcomingTvSeriesUrl: 'https://api.themoviedb.org/3/tv/on_the_air',
    popTvSeriesUrl: 'https://api.themoviedb.org/3/tv/popular',
    casteOrRecommendedUrl: 'https://api.themoviedb.org/3/movie/',
    imageUrl: 'https://image.tmdb.org/t/p/original/',
    searchMovieUrl: 'https://api.themoviedb.org/3/search/movie?query='
}