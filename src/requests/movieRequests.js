import axios from "axios";


const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDg1NGMyYzQxMzZiODg4NjU1ZTM4MTU4MzQ1NWExMyIsInN1YiI6IjY1ZWQ4YTYxNDQ3ZjljMDE2NDVmYjUyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EzewA_AxAwpK7D9BNDf4TLde_74vJgg4OXwaqliZ7bY'
  }
};

const makeRequest = async (url) => {
   return axios.get(url, options)
.then(response => response)
.catch(err => console.error(err));
}


export const getTrendingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  return await makeRequest(url);
}

export const getSearchedMovies = async (query, page) => {
   const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  return await makeRequest(url);
}

export const getMovieDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  return await makeRequest(url);
}

export const getMovieCredits = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  return await makeRequest(url);
}

export const getMovieReviews = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`;
  return await makeRequest(url);
}
