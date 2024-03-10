import './App.css'
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { BallTriangle } from 'react-loader-spinner';
import Navigation from '../Navigation/Navigation'


const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

export default function App() {
 
  return (
    <>
      <Navigation />
       <Suspense fallback={<BallTriangle
                              height={100}
                              width={100}
                              radius={5}
                              color="#4fa94d"
                              ariaLabel="ball-triangle-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                              />}>
       <Routes>
               <Route path='/' element={<HomePage  />} />
               <Route path='/movies' element={<MoviesPage />} />
               <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
                  <Route path='cast' element={<MovieCast />} />
                  <Route path='reviews' element={ <MovieReviews/>} />
               </Route>
               <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
    </>
  )
}


