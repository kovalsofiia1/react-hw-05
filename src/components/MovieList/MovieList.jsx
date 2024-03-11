import css from './MovieList.module.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
    const location = useLocation();
    console.log(movies)
  return (
    <div>
          <ul className={css.filmsList}>
              {movies.map((movie) => {
                  return (
                      <li key={movie.id} className={css.filmCard}>
                          <Link to={`/movies/${movie.id}`} state={location}>
                            <div className={css.imgCont}>
                                <img src={ `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" className={css.poster}/>
                            </div>
                            <span>{movie.title}</span>
                          </Link>
                      </li>)
              })}
          </ul>
    </div>
  )
}
