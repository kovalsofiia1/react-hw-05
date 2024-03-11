import css from './MovieCast.module.css'

import { useEffect, useState } from 'react'
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
    <ul className={css.cast}>
      {cast?.map((actor) => {
        return (
          <li key={actor.id} className={css.actor} >
            <div className={css.actorPic}>
              {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name + ' picture'} width={150} className={css.pic} />}
            </div>
              <p className={css.text}>{actor.name}</p>
            <p className={css.text}>Character: {actor.character}</p>
          </li>
       )
     })}
    </ul>
  )
}
