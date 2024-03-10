import {useEffect, useState, useRef} from 'react'
import SearchForm from '../../components/SearchForm/SearchForm'
import { getSearchedMovies } from '../../requests/movieRequests';
import MovieList from '../../components/MovieList/MovieList';
import Controls from '../../components/Controls/Controls';
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {

  const [movies, setMovies] = useState([]);
  
  const total = useRef(null);
  const [params, setParams] = useSearchParams();

  const query = params.get("query") ?? "";
  let page = Number(params.get('page')) ?? 1;

  useEffect(() => {

    if (!query) return;
    async function getMovies() {
        try {
          const responce = await getSearchedMovies(query, page);
          total.current = responce.total_pages;
          console.log(responce);
          setMovies([ ...responce.data.results ]);
      }
      catch (e) {
        console.log(e);
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
    setParams(params);
    e.target.reset();
  }

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      <MovieList movies={movies} />
      {query && <Controls onPrev={handlePrev} onNext={handleNext} isFirst={isFirst} isLast={isLast} />}
    </div>
  )
}
