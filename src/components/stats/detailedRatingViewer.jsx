import ProgressBar from '../progressBar'
import Rating from '../rating'

export default function DetailedRatingViewer ({ ratings }) {
  const totalRated = Object.values(ratings).reduce((prev, cur) => prev + cur, 0)
  const avgRating = Object.keys(ratings).reduce((prev, cur) => prev + ratings[cur] * cur, 0) / totalRated

  return (
    <div className='flex gap-6 items-center pl-5 mt-10'>
      <div>
        <p className='text-5xl text-center'>{avgRating.toFixed(2)}</p>
        <Rating rating={avgRating} />
        <p className='text-center mt-3'> {`${totalRated} reviews`} </p>
      </div>
      <div className='flex flex-col w-96'>
        {
            Object.keys(ratings).map((rating) => {
              const noPeople = ratings[rating]
              return (
                <div key={rating} className='flex gap-2'>
                  <p>{rating}</p>
                  <ProgressBar key={rating} className='my-2' complete={noPeople / totalRated} />
                </div>
              )
            })
          }
      </div>
    </div>
  )
}
