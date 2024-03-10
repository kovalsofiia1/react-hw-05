import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
    const location = useLocation();
  return (
    <div>
          <ul>
              {movies.map((movie) => {
                  return (
                      <li key={movie.id}>
                          <Link to={`/movies/${movie.id}`} state={ location }>
                              {movie.title}
                          </Link>
                      </li>)
              })}
          </ul>
    </div>
  )
}
