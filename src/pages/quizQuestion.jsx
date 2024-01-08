import { useState } from 'react'

import { BsQuestion } from 'react-icons/bs'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import McqProblem from '../components/mathRender/McqProblem'
import Markdown from 'react-markdown'
import ShortAnswer from '../components/mathRender/ShortAnswer'
import { parse } from '../services/parser'
import Latex from '../components/mathRender/Latex'

const QuizQuestion = ({
  questionStr,
  answerUpdateCallback,
  ...props
}) => {
  const [show, setShow] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmiited] = useState(false)

  const { type, explanation, hint, correct, ...questionParams } = parse(questionStr)

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
          setSubmiited(true)
          if (values.answer.trim() === correct) {
            setMessage('correct')
            answerUpdateCallback('correct')
            setShow('explanation')
          } else {
            setMessage('wrong')
            answerUpdateCallback('wrong')
            setShow('explanation')
          }

        }}
      >
        <Form>
          {type === 'mcq' && (
            <McqProblem
              className=''
              name='answer'
              disabled={submitted}
              {...questionParams}
            />
          )}

          {type === 'short_question' && (
            <ShortAnswer
              className=''
              name='answer'
              disabled={submitted}
              {...questionParams}
            />
          )}

          <div className='bg-gray-200 rounded-b-2xl px-8 py-4'>
            <div className='flex items-center justify-between'>
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

              <div className=''>
                <button
                  className={
                    'border bg-zinc-900 text-white inline px-4 py-2 rounded-full cursor-pointer mr-8' + 
                    'disabled:bg-green-700 disabled:cursor-not-allowed'
                  }
                  type='submit'
                  disabled={submitted}
                >
                  Submit
                </button>
              </div>
            </div>

            {message === 'correct' && (
              <div className='mt-8'>
                <p className='text-green-900'>Correct Answer</p>
              </div>

            )}

            {message === 'wrong' && (
              <div className='mt-8'>
                <p className='text-red-600'>Wrong Answer</p>
                <div className='flex gap-2'>
                  <p className='text-zinc-700'> Correct Answer : </p>
                  <p className=''> {correct}</p>
                </div>
              </div>

            )}

            {explanation && show === 'explanation' && (
              <div className='mt-8'>
                <p className='text-zinc-600'> Explanation</p>
                <Latex><Markdown>{explanation}</Markdown></Latex>
              </div>
            )}
            {show === 'hint' && (
              <div className='mt-8'>
                <Latex><Markdown>{hint}</Markdown></Latex>
              </div>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default QuizQuestion
