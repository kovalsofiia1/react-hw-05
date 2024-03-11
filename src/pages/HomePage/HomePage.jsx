import {useEffect, useState} from 'react'
import { getTrendingMovies } from '../../requests/movieRequests';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setError(false);
    setIsLoading(false);
    const makeRequests = async () => {
      try {
        const responce = await getTrendingMovies();
        console.log(responce.data.results)
        setTrending([...responce.data.results]);
      }
      catch (e) {
        setError(true);
        console.log(e);
      }
      finally {
        setIsLoading(false);
      }
    }
    makeRequests();
  }, [])

 
  return (
    <div>
      <h2>Trending today</h2>
      {isLoading && <Loader />}
      {error && <ErrorMessage/> }
      {!error && !isLoading && <MovieList movies={trending} />}
    </div>
  )
}
