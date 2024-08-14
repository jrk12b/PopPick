import {useEffect} from 'react';

const useMovies = (url, setMovies, setLoading, setError) => {
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [url, setMovies, setLoading, setError]);
};

export default useMovies;
