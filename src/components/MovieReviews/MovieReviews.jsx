import css from './MovieReviews.module.css'

import { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import { getMovieReviews } from '../../requests/movieRequests';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (!movieId) return;
    async function getReviews() {
      try {
        const responce = await getMovieReviews(movieId);
        console.log(responce.data)
        setReviews([...responce.data.results]);
      }
      catch (e) {
        console.log(e);
      }
    }
    getReviews()
  }, [movieId])

  return (
  <div>
    {reviews.length > 0 ? 
    (<ul className={css.reviewsList}>
    {
      reviews.map((review) => {
        return (
          <li key={review.id} >
            <div className={css.review}>
              <h3>Author: {review.author}</h3>
              <p className={css.text}>{review.content}</p>
              <h4>Date: {review.updated_at.split('T')[0]}</h4>
            </div>
            <hr />
          </li>
        )
      })
    }
      </ul>) :
      <p>No reviews yet</p>
      }
      </div>
  )
}
