import EmptyStarSvg from './svgs/emptyStarSvg'
import FilledStarSvg from './svgs/filledStarSvg'

export default function Rating ({ rating }) {
  rating = Math.floor(rating)
  return (
    <div className='flex items-center'>
      {
        Array.from({ length: rating }, (_, idx) => {
          return (
            <FilledStarSvg key={idx} />
          )
        })
      }

      {
        Array.from({ length: 5 - rating }, (_, index) => {
          return (
            <EmptyStarSvg key={index} />
          )
        })
      }
    </div>
  )
}
