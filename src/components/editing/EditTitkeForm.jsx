import { useState } from 'react'
import EditIconSVG from '../svgs/editIconSVG'
import { Formik } from 'formik'
import { Form } from 'react-router-dom'
import DoneIconSVG from '../svgs/doneIconSVG'
import * as Yup from 'yup'

export default function EditTitleForm ({ lessonTitle, setLessonTitle }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  if (!isEditingTitle) {
    return (
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl p-2'> {lessonTitle}</h2>
        <div onClick={() => setIsEditingTitle(true)}>
          <EditIconSVG classname='h-5 w-5 cursor-pointer' />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Formik
          initialValues={{
            title: lessonTitle
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .required('You must enter a title')
              .max(20, 'Title should be less than 20 characters')
          })}
          onSubmit={(value) => {
            setLessonTitle(value.title)
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
    )
  }
}
