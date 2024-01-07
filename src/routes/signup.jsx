import { Form, redirect, useActionData } from 'react-router-dom'
import SignupForm from '../components/signupForm'
import { signup } from '../services/authService'

export async function action ({ request, params }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  if (data.intent === 'login') {
    return redirect('/login')
  } else if (data.intent === 'signup') {
    delete data.intent
    delete data.retypePassword
    console.log(data)
    const status = await signup(data)
    if (status.status === 'success') {
      return redirect('/home')
    } else {
      return {
        formError: status.message
      }
    }
  }

  return redirect('/signup')
}

export default function Signup () {
  const actiondata = useActionData()

  return (
    <div className='flex justify-center overflow-x-hidden'>
      <div className='flex w-2/3'>
        <div className='flex flex-col basis-1/3 justify-center text-center'>
          <p className='text-3xl'>Welcome</p>
          <p className='text-zinc-400'> Join The Interesting</p>
          <p className='text-zinc-400'>Journey of Math</p>
          <p className='text-xs mt-8'>Already Have an account</p>

          <div className='flex justify-center'>
            <Form method='post'>
              <button
                className='w-32 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                type='submit'
                name='intent'
                value='login'
              >SIGN IN
              </button>
            </Form>

          </div>

        </div>
        <SignupForm className='basis-2/3 flex flex-col justify-center p-10' errosMsg={actiondata} />

      </div>
    </div>
  )
}
