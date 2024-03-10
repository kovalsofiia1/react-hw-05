import { useEffect,useState } from 'react'
import {  useParams } from 'react-router-dom'
import { getMovieCredits } from '../../requests/movieRequests';

export default function MovieCast() {
   const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
     if (!movieId) return;
    async function getMovieCast() {
      try {
        const responce = await getMovieCredits(movieId);
        console.log(responce.data)
        setCast([ ...responce.data.cast ]);
      }
      catch (e) {
        console.log(e);
      }
    }  
    getMovieCast()
  }, [movieId])
  
  return (
    <ul>
      {cast?.map((actor) => {
        return (
          <li key={actor.id}>
            {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name + ' picture'} width={150} />}
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
            <hr />
          </li>
       )
     })}
    </ul>
  )
}
