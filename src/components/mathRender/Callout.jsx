import { validate } from '../../services/parser'
// import MDXViewer from '../MDXViewer'
import Latex from './Latex'

// const colors = {
//   normal: 'red'
// }

// const images = {
//   normal: 'problem-solving.png'
// }

const Callout = ({ type = 'normal', children }) => {
  const requiredParams = ['text']
  const absentParams = validate(children, requiredParams)
  if (absentParams.length !== 0) {
    return (
      <div>
        There must be {absentParams.join(',')} field(s) present
      </div>
    )
  }

  return (
    <div className='border-2 rounded-2xl relative px-8 pt-6 bg-gray-100 my-6'>
      {/* <img src={`/flaticons/${images[type]}`} alt="callout" className='absolute -top-20 left-8 p-1 w-20 rounded-lg' /> */}
      <p className='text-justify'>
        <Latex>
          {children.text}
        </Latex>
      </p>
    </div>
  )
}

export default Callout
