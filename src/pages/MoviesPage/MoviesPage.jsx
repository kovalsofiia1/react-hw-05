import {useEffect, useState, useRef} from 'react'
import SearchForm from '../../components/SearchForm/SearchForm'
import { getSearchedMovies } from '../../requests/movieRequests';
import MovieList from '../../components/MovieList/MovieList';
import Controls from '../../components/Controls/Controls';
import { useSearchParams } from "react-router-dom";
import NoResults from '../../components/NoResults/NoResults';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';


export default function MoviesPage() {

  const [movies, setMovies] = useState([]);
  const total = useRef(null);
  const [params, setParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = params.get("query") ?? "";
  let page = params.get('page') ?? 1;
  page = Number(page);

  useEffect(() => {

    if (!query) return;
    setError(false);
    setIsLoading(false);
    //setMovies([]);
    async function getMovies() {
        try {
          const responce = await getSearchedMovies(query, page);
          total.current = responce.total_pages;
          console.log(responce);
          setMovies([ ...responce.data.results ]);
      }
      catch (e) {
        setError(true);
        console.log(e);
      }
      finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [query,page])


  const handlePrev = () => {
    page = page - 1;
    params.set('page', page);
    setParams(params);
  }
  const handleNext = () => {
    page = page + 1;
    params.set('page', page);
    setParams(params);
  }
  const isLast = total === page;
  const isFirst = page === 1;

  console.log(isFirst, isLast, page, total)

  const handleSubmit = (e) => {
    e.preventDefault();
    page = 1;
    params.set('query', e.target.elements.search.value);
    params.set('page', page);
    setParams(params);
    setMovies([])
    e.target.reset();
  }

  console.log(Boolean(query), movies.length, !error);
  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {(query && movies.length>0 && !error) &&  <MovieList movies={movies} />}
      {(query && movies.length === 0 && !error) ?? <NoResults/>}
      
      {query && movies.length>0 && <Controls onPrev={handlePrev} onNext={handleNext} isFirst={isFirst} isLast={isLast} />}
    </div>
  )
}
