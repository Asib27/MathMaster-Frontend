import { useState } from 'react'

import { BsQuestion } from 'react-icons/bs'
import Latex from './Latex'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import McqProblem from './McqProblem'
import Markdown from 'react-markdown'
import ShortAnswer from './ShortAnswer'

const ProblemContainer = ({
  elementId,
  type,
  correct,
  explanation,
  hint,
  ...props
}) => {
  const [show, setShow] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div className='bg-gray-100 text-justify rounded-2xl pt-10 mb-12 relative'>
      <div className='absolute bg-gray-800 text-white top-0 right-8 rounded-full w-12 h-12 flex items-center justify-center -translate-y-1/2 text-xl font-semibold shadow-md'>
        <BsQuestion size={24} />
      </div>
      {/* <div className='px-8 mb-4'>{children}</div> */}

      <Formik
        initialValues={{
          answer: ''
        }}
        validationSchema={Yup.object({
          answer: Yup.string()
            .required('Please Submit an Answer')
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (values.answer.trim() === correct) {
            setMessage('Your answer is correct')
          } else {
            setMessage('Your answer is wrong')
          }
        }}
      >
        <Form>
          {type === 'mcq' && (
            <McqProblem
              className=''
              name='answer'
              {...props}
            />
          )}

          {type === 'short_question' && (
            <ShortAnswer
              className=''
              name='answer'
              {...props}
            />
          )}

          <div className='bg-gray-200 rounded-b-2xl px-8 py-4'>
            <div className='flex items-center justify-between'>
              <div className=''>
                <button
                  className='border border-black bg-black text-white inline px-4 py-2 rounded-full cursor-pointer mr-8'
                  type='submit'
                >
                  Submit
                </button>
                {explanation && (
                  <div
                    className='border border-gray-500 inline px-4 py-2 rounded-full cursor-pointer'
                    onClick={() => setShow('explanation')}
                  >
                    Show Explanation
                  </div>
                )}
              </div>

              <div className=''>
                {hint && (
                  <div
                    className='border border-gray-400 inline px-4 py-2 rounded-md cursor-pointer'
                    onClick={() => setShow('hint')}
                  >
                    Hint
                  </div>
                )}
              </div>
            </div>

            {message && (
              <p className='mt-8'> {message} </p>
            )}

            {show === 'explanation' && (
              <div className='mt-8 ml-2'>
                <Latex><Markdown>{explanation}</Markdown></Latex>
              </div>
            )}
            {show === 'hint' && (
              <div className='mt-8 ml-2'>
                <Latex><Markdown>{hint}</Markdown></Latex>
              </div>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ProblemContainer
