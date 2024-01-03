import { validate } from '../../services/parser'
import Latex from './Latex'
import { useState } from 'react'

const Definition = ({ children }) => {
  const [open, setOpen] = useState(false)

  const requiredParams = ['text', 'definition']
  const absentParams = validate(children, requiredParams)
  if (absentParams.length !== 0) {
    return (
      <div>
        There must be {absentParams.join(',')} field(s) present
      </div>
    )
  }

  return (
    <span
      className='cursor-pointer inline-block z-20 relative border-b-2 border-dashed hover:border-solid border-primary-500 transition-all duration-300 -py-2'
      // style={{width: "100vw"}}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className=''>
        <Latex>{children.text}</Latex>
      </span>

      {open && (
        <p className='absolute shadow-lg px-6 py-4 rounded-lg top-8 m-auto border bg-white text-sm w-56'>
          <Latex>{children.definition}</Latex>
        </p>
      )}
    </span>
  )
}

export default Definition
