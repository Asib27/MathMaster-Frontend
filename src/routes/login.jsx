import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextInput from '../components/textInput'

function EmailSvg () {
  return (
    <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
      <svg className='w-4 h-4 text-gray-500' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 16'>
        <path d='m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z' />
        <path d='M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z' />
      </svg>
    </div>
  )
}

function PasswordSvg () {
  return (
    <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
      <svg className='w-4 h-4 text-gray-500' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' strokeWidth='0' />
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
        <g id='SVGRepo_iconCarrier'>
          <path d='M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </g>
      </svg>
    </div>
  )
}

export default function Login () {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '' // added for our select
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form>
          <TextInput
            className=''
            label='Email Address'
            name='email'
            type='email'
            placeholder='jane@formik.com'
            autoComplete='email'
            Icon={EmailSvg}
          />

          <TextInput
            label='Password'
            name='password'
            type='password'
            placeholder='*******'
            autoComplete='password'
            Icon={PasswordSvg}
          />

          <div className='flex justify-center'>
            <button
              className='w-32 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
              type='submit'
            >Submit
            </button>

          </div>
        </Form>
      </Formik>
    </>
  )
}
