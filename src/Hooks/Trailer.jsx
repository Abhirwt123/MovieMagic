import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constant';

const useTrailerKey = (movie_id) => {
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        const getTrailer = async () => {
            try {
                const data = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos`, API_OPTIONS);
                const json = await data.json();
                if (json.results && json.results.length > 0) {
                    setTrailerKey(json.results[1].key); 
                }
            } catch (error) {
                console.error('Error fetching trailer:', error);
            }
        };

        getTrailer();
    }, [movie_id]);

    return trailerKey;
};

export default useTrailerKey;
