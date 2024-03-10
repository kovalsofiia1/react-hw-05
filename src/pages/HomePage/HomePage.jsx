import {useEffect, useState} from 'react'
import { getTrendingMovies } from '../../requests/movieRequests';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
   const [trending, setTrending] = useState([]);

  useEffect(() => {
    const makeRequests = async () => {
      try {
        const responce = await getTrendingMovies();
        console.log(responce.data.results)
        setTrending([...responce.data.results]);
      }
      catch (e) {
        console.log(e);
      }
      
    }
    makeRequests();
  }, [])

 
  return (
    <div>
      <h2>Trending today</h2>
      <MovieList movies={trending} />
    </div>
  )
}
