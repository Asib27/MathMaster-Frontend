import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextInput from './textInput'
import { useSubmit } from 'react-router-dom'
import EmailSvg from './svgs/emailSvg'
import PasswordSvg from './svgs/passwordSvg'

export default function LoginForm ({ errosMsg, className }) {
  const submit = useSubmit()

  return (
    <div className={className}>
      <p className='text-3xl text-center'>Login </p>
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
          const formData = new FormData()
          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value)
          })
          formData.append('intent', 'login')

          submit(formData, {
            method: 'POST',
            action: '/login'
          })
          setSubmitting(false)
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

          {
          errosMsg &&
            <div className='flex justify-center'>
              <p className=' show_info text-sm mb-4 w-max text-red-400'>
                {errosMsg}
              </p>
            </div>
          }

          <div className='flex justify-center'>
            <button
              className='w-32 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
              type='submit'
            > SIGN IN
            </button>

          </div>
        </Form>
      </Formik>

    </div>
  )
}
