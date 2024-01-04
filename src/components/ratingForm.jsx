import { Form } from 'react-router-dom'
import Rating from './rating'

export default function RatingForm ({ course }) {
  return (
    <div>
      {course.myRating &&
        <div className='flex gap-10 ml-5 mt-10'>
          <p className='text-green-700 text-xl'> Your previous rating</p>
          <Rating rating={course.myRating} />
        </div>}
      <div className='flex gap-4 items-center'>
        <p className='pl-5 text-green-700 text-center text-xl'> {course.myRating ? 'Change Rating' : 'Leave a Rating'}</p>
        {/* Rating */}
        <Form className='flex items-center' method='post'>
          <div className='flex flex-row-reverse justify-end items-center'>
            <input name='stars' id='hs-ratings-readonly-1' type='radio' className='peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0' value='5' required />
            <label htmlFor='hs-ratings-readonly-1' className='peer peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600'>
              <svg className='flex-shrink-0 w-5 h-5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
              </svg>
            </label>
            <input name='stars' id='hs-ratings-readonly-2' type='radio' className='peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0' value='4' />
            <label htmlFor='hs-ratings-readonly-2' className='peer peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600'>
              <svg className='flex-shrink-0 w-5 h-5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
              </svg>
            </label>
            <input name='stars' id='hs-ratings-readonly-3' type='radio' className='peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0' value='3' />
            <label htmlFor='hs-ratings-readonly-3' className='peer peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600'>
              <svg className='flex-shrink-0 w-5 h-5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
              </svg>
            </label>
            <input name='stars' id='hs-ratings-readonly-4' type='radio' className='peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0' value='2' />
            <label htmlFor='hs-ratings-readonly-4' className='peer peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600'>
              <svg className='flex-shrink-0 w-5 h-5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
              </svg>
            </label>
            <input name='stars' id='hs-ratings-readonly-5' type='radio' className='peer -ms-5 w-5 h-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0' value='1' />
            <label htmlFor='hs-ratings-readonly-5' className='peer peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-gray-600'>
              <svg className='flex-shrink-0 w-5 h-5' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
              </svg>
            </label>
          </div>
          <button
            className='m-4  w-19 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-lg'
            type='submit' name='intent' value='rating'
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  )
}
