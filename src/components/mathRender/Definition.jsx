import Latex from './Latex'
import { useState } from 'react'

const Definition = ({ text, definition }) => {
  const [open, setOpen] = useState(false)

  return (
    <span
      className='cursor-pointer inline-block z-20 relative border-b-2 border-dashed hover:border-solid border-primary-500 transition-all duration-300 -py-2'
      // style={{width: "100vw"}}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className=''>
        <Latex>{text}</Latex>
      </span>

      {open && (
        <p className='absolute shadow-lg px-6 py-4 rounded-lg top-8 m-auto border bg-white text-sm w-56'>
          <Latex>{definition}</Latex>
        </p>
      )}
    </span>
  )
}

export default Definition
