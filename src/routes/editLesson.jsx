import { useLoaderData } from 'react-router-dom'
import { getLesson } from '../services/lessonService'
import { useState } from 'react'
import EditIconSVG from '../components/svgs/editIconSVG'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import DoneIconSVG from '../components/svgs/doneIconSVG'

export async function loader ({ params }) {
  const lesson = await getLesson(params.lessonId)
  return { lesson }
}

export default function EditLesson () {
  const { lesson } = useLoaderData()
  const [curLesson, setCurLesson] = useState(lesson)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  console.log(curLesson)

  return (
    <div className='p-10'>
      {!isEditingTitle
        ? (
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl p-2'> {curLesson.name}</h2>
            <div onClick={() => setIsEditingTitle(true)}>
              <EditIconSVG classname='h-5 w-5 cursor-pointer' />
            </div>
          </div>
          )
        : (
          <div>
            <Formik
              initialValues={{
                title: lesson.name
              }}
              validationSchema={Yup.object({
                title: Yup.string()
                  .required('You must enter a title')
                  .max(20, 'Title should be less than 20 characters')
              })}
              onSubmit={(value) => {
                setCurLesson({
                  ...curLesson,
                  name: value.title
                })
                setIsEditingTitle(false)
              }}
            >
              {formik => (
                <Form className='flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <input
                      className='text-3xl bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 '
                      {...formik.getFieldProps('title')}
                    />
                    {
                  formik.touched.title && formik.errors.title &&
                    <div className='text-red-600 block mb-2 text-sm font-medium'>{formik.errors.title}</div>
                }
                  </div>
                  <div className='cursor-pointer' onClick={() => formik.submitForm()}>
                    <DoneIconSVG className='h-5 w-5' />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          )}

    </div>
  )
}
