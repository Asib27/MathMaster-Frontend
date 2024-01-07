import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextInput from './textInput'
import { useSubmit } from 'react-router-dom'
import UsernameSvg from './svgs/userNameSvg'
import PasswordSvg from './svgs/passwordSvg'
import EmailSvg from './svgs/emailSvg'
import { isUniqueUsername } from '../services/authService'

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`
}

export default function SignupForm ({ errosMsg, className }) {
  const submit = useSubmit()

  return (
    <div className={className}>
      <p className='text-3xl text-center'>Signup </p>
      <Formik
        initialValues={{
          email: '',
          password: '',
          retypePassword: '',
          username: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('Required')
            .min(8, 'Password must have at least 8 characters')
            .matches(/[0-9]/, getCharacterValidationError('digit'))
            .matches(/[a-z]/, getCharacterValidationError('lowercase'))
            .matches(/[A-Z]/, getCharacterValidationError('uppercase'))
            .matches(/[@$!%*#?&]/, getCharacterValidationError('special symbol')),
          retypePassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
          username: Yup.string()
            .required('Required')
            .min(4, 'Must be at least 4 characters')
            .max(20, 'Must be at less than 20 characters')
            .test('Unique username', 'Username Already in use', async (value) => {
              const status = await isUniqueUsername(value)
              return status.isUnique
            })
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false)

          const formData = new FormData()
          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value)
          })
          formData.append('intent', 'signup')

          submit(formData, {
            method: 'POST',
            action: '/signup'
          })
        }}
      >
        <Form>
          <TextInput
            className=''
            label='Email Address'
            name='email'
            type='email'
            placeholder='math-learner@email.com'
            autoComplete='email'
            Icon={EmailSvg}
          />

          <TextInput
            label='Username'
            name='username'
            type='username'
            autoComplete='username'
            placeholder='math-learner27'
            Icon={UsernameSvg}
          />

          <TextInput
            label='Password'
            name='password'
            type='password'
            placeholder='********'
            autoComplete='new-password'
            Icon={PasswordSvg}
          />

          <TextInput
            label='Retype Password'
            name='retypePassword'
            type='password'
            placeholder='********'
            autoComplete='new-password'
            Icon={PasswordSvg}
          />

          {
          errosMsg && errosMsg.formError &&
            <div className='flex justify-center'>
              <p className=' show_info text-sm mb-4 w-max text-red-400'>
                {errosMsg.formError}
              </p>
            </div>
          }

          <div className='flex justify-center'>
            <button
              className='w-32 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
              type='submit'
            > SIGN UP
            </button>

          </div>
        </Form>
      </Formik>

    </div>
  )
}
