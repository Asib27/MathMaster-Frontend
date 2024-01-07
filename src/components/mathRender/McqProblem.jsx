import Latex from './Latex'
import { useField } from 'formik'

const McqProblem = ({
  type = 'mcq',
  question,
  options,
  ...props
}) => {
  const [field, meta, helpers] = useField(props)

  // const getBg = (state, i) => {
  //   if (state === 'correct' && i === selected) return ' bg-green-50 '
  //   else if (state === 'incorrect' && i === selected) return ' bg-red-50 '
  //   else if (state === 'incorrect' && i !== selected && i === correct) { return ' bg-green-50 ' } else if (state === 'selected' && i === selected) { return ' bg-blue-gray-100 ' } else return ' bg-blue-gray-50 '
  // }

  // const getRadio = (state, i) => {
  //   if (state === 'correct' && i === selected) {
  //     return ' bg-green-500 border-2 border-green-500 '
  //   } else if (state === 'incorrect' && i === selected) {
  //     return ' bg-red-500 border-2 border-red-500 '
  //   } else if (state === 'incorrect' && i === correct) {
  //     return ' bg-green-500 border-2 border-green-500 '
  //   } else if (state === 'selected' && i === selected) {
  //     return ' bg-blue-gray-500 border-2 border-blue-gray-500 '
  //   } else return ' border-2 border-blue-gray-400 '
  // }

  return (
    <div className='px-10'>
      <Latex>{question}</Latex>

      <>
        {options.split(',').map((option, i) => (
          <div
            className={
                'flex my-2 px-4 py-1 rounded-md items-center justify-between ' + ''

              }
            key={i}
            onClick={() => helpers.setValue(option)}
          >
            <div
              data-ripple-dark='false'
              className='flex items-center justify-left gap-x-3 flex-1 cursor-pointer'
            >
              {option === field.value
                ? (
                  <div
                    className='flex justify-center items-center  w-5 h-5 rounded-full  border-2 border-zinc-600'
                  >
                    <div className='rounded-full w-3 h-3 bg-blue-600' />
                  </div>
                  )
                : <div
                    className='w-5 h-5 rounded-full  border-2 border-zinc-600'
                  />}
              <Latex>{option.trim()}</Latex>

            </div>
            {/* {option === correct && isSubmitted && (
              <div className='text-green-500'>
                <FiCheck />
              </div>
            )}
            {option !== correct && selected === i && isSubmitted && (
              <div className='text-red-500'>
                <RxCross2 />
              </div>
            )} */}
          </div>
        ))}
        <div>

          {meta.touched && meta.error
            ? (
              <div className='text-red-600 block mb-2 text-sm font-medium'>{meta.error}</div>
              )
            : null}
        </div>
      </>

    </div>
  )
}

export default McqProblem
