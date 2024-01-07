import { useField } from 'formik'

export default function TextInput ({ label, Icon, className, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)

  return (
    <div className={'p-4 ' + className}>
      <label
        htmlFor={props.id || props.name}
        className='block mb-2 text-sm font-medium text-gray-900'
      >{label}
      </label>
      <div className='relative'>
        <Icon />
        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 '
          {...field}
          {...props}
          id={props.name} // abc123A@
        />
      </div>
      <div>
        {meta.touched && meta.error
          ? (
            <div className='text-red-600 block mb-2 text-sm font-medium'>{meta.error}</div>
            )
          : null}
      </div>
    </div>
  )
}
