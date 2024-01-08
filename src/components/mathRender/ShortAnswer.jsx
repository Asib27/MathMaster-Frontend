import { useId } from 'react'

import Latex from './Latex'
import { useField } from 'formik'
import Markdown from 'react-markdown'

const ShortAnswer = ({
  question,
  className,
  name,
  disabled,
  ...props
}) => {
  const [field, meta] = useField(name)
  const id = useId()

  return (
    <div className='px-10 '>
      <label className='flex flex-col gap-4 mb-4'>
        <Latex><Markdown>{question}</Markdown></Latex>
        <input
          name={id}
          id={id}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 disabled:cursor-not-allowed'
          placeholder='Answer'
          disabled={disabled}
          {...field}
        />
      </label>
      <div>
        {meta.touched && meta.error
          ? (
            <div className='text-red-600 block mb-2 text-sm font-medium'>{meta.error}</div>
            )
          : null}
      </div>
      <div>
        {/* {isCorrect === 1 && (
          <div
            className='text-green-500 p-3 flex items-center justify-center rounded-md shadow bg-green-50'
          >
            <FiCheck />
          </div>
        )}
        {isCorrect === 0 && (
          <div
            className='text-red-500 p-3 flex items-center justify-center rounded-md shadow bg-red-50'
          >
            <RxCross2 />
          </div>
        )} */}
      </div>

      {/* {isCorrect === 0 && (
        <div className='flex items-center'>
          <p>Correct:&nbsp; </p> <Latex>{correct}</Latex>
        </div>
      )} */}
    </div>
  )
}

export default ShortAnswer
