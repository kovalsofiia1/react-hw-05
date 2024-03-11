import css from './MovieDetails.module.css'

import { useEffect, useState, useRef } from 'react'
import { Outlet, useParams, NavLink, useLocation } from 'react-router-dom'
import { getMovieDetails } from '../../requests/movieRequests';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { FaArrowLeft } from "react-icons/fa";

export default function MoviePage() {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    if (!movieId) return;
    setError(false);
    setIsLoading(true);
    async function getMovieInfo() {
      try {
        const responce = await getMovieDetails(movieId);
        console.log(responce.data)
        setDetails({ ...responce.data });
      }
      catch (e) {
        console.log(e);
        setError(true);
      }
      finally {
        setIsLoading(false);
      }
    }
    getMovieInfo()
  }, [movieId])

  return (
      <div>
      <NavLink to={backLinkRef.current} className={css.back}><FaArrowLeft /> <span>Go Back</span></NavLink>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {(!isLoading && !error) &&
        <div>
          <div className={css.movie}>
            <div className={css.poster}>
              {details?.poster_path && <img src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`} alt={details.tittle + ' poster'} width={250} /> }
            </div>
          <div className={css.details}>
              <h2 className={css.title}>{details.title}</h2>
              <div className={css.block}>
                <p className={css.text}>User score: {parseInt(parseFloat(Number(details.vote_average))*10)}%</p>
                <p className={css.text}>Release date: {details.release_date}</p>
              </div>
              <div className={css.block}>
                <h3>Overview</h3>
                <p className={css.overview}>{details.overview}</p>
              </div>
              <div>
                <div className={css.block}>
                  <h3>Genres</h3>
                  <p>{details?.genres?.map((genre) => { return genre.name }).join(' ')}</p>
                </div>
                 
              </div>
           
            </div>
           
          </div>
           <hr />
            <h2 className={css.infoTitle}>Additional information</h2>
            <ul className={css.infoList}>
              <li><NavLink to='cast' element={<MovieCast/>} className={css.link} >Cast</NavLink></li>
              <li><NavLink to='reviews' element={<MovieReviews/>} className={css.link} >Reviews</NavLink></li>
            </ul>
            <hr />
            <Outlet/>
        </div>
      }
      </div>
  )
}
