import { useEffect,useState } from 'react'
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
    (<ul>
    {
      reviews.map((review) => {
        return (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
            <p>Date: {review.updated_at.split('T')[0]}</p>
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
