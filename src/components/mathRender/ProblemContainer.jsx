import { useState } from 'react'

import { BsQuestion } from 'react-icons/bs'
import Latex from './Latex'

const ProblemContainer = ({
  children,
  hint,
  explanation,
  handleSubmission
}) => {
  const [showExplanation, setShowExplanation] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleButton = (type) => {
    if (type === 'hint') {
      setShowExplanation(false)
      setShowHint((prev) => !prev)
    } else if (type === 'explanation') {
      setShowHint(false)
      setShowExplanation((prev) => !prev)
    }
  }

  return (
    <div className='bg-gray-100 text-justify rounded-2xl pt-10 mb-12 relative'>
      <div className='absolute bg-gray-800 text-white top-0 right-8 rounded-full w-12 h-12 flex items-center justify-center -translate-y-1/2 text-xl font-semibold shadow-md'>
        <BsQuestion size={24} />
      </div>
      <div className='px-8 mb-4'>{children}</div>

      <div className='bg-gray-200 rounded-b-2xl px-8 py-4'>
        <div className='flex items-center justify-between'>
          <div className=''>
            <div
              className='border border-black bg-black text-white inline px-4 py-2 rounded-full cursor-pointer mr-8'
              onClick={handleSubmission}
            >
              Submit
            </div>
            {explanation && (
              <div
                className='border border-gray-500 inline px-4 py-2 rounded-full cursor-pointer'
                onClick={() => handleButton('explanation')}
              >
                Show Explanation
              </div>
            )}
          </div>

          <div className=''>
            {hint && (
              <div
                className='border border-gray-400 inline px-4 py-2 rounded-md cursor-pointer'
                onClick={() => handleButton('hint')}
              >
                Hint
              </div>
            )}
          </div>
        </div>

        {showExplanation && (
          <p className='mt-8'>
            <Latex>{explanation}</Latex>
          </p>
        )}
        {showHint && (
          <p className='mt-8'>
            <Latex>{hint}</Latex>
          </p>
        )}
      </div>
    </div>
  )
}

export default ProblemContainer
