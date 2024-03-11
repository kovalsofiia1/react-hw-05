import { useEffect,useState,useRef } from 'react'
import { Outlet, useParams, Link, useLocation } from 'react-router-dom'
import { getMovieDetails } from '../../requests/movieRequests';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';


export default function MoviePage() {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    if (!movieId) return;
    async function getMovieInfo() {
      try {
        const responce = await getMovieDetails(movieId);
        console.log(responce.data)
        setDetails({ ...responce.data });
      }
      catch (e) {
        console.log(e);
      }
    }  
    getMovieInfo()
  }, [movieId])
  
  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      <div>
        {details?.poster_path && <img src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`} alt={details.tittle + ' poster'} />}
        </div>
      <p>{details.title}</p>
      <p>User score: {parseInt(parseFloat(Number(details.vote_average))*10)}%</p>
      <p>Release date: {details.release_date}</p>
      <p>Overview</p>
      <p>{details.overview}</p>
      <p>Genres</p>
      <p>{details?.genres?.map((genre) => { return genre.name }).join(' ')}</p>
      <hr />

      <p>Additional information</p>
      <ul>
        <li><Link to='cast' element={<MovieCast />}>Cast</Link></li>
        <li><Link to='reviews' element={<MovieReviews/> }>Reviews</Link></li>
      </ul>
      <hr />
      <Outlet/>
    </div>
  )
}
