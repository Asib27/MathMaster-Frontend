import Latex from './Latex'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { getDefinition } from '../../services/definitionService,js'
import { Link } from 'react-router-dom'
import LoadingIndicator from '../svgs/loading'

const DefinitionDisplay = ({ href, text }) => {
  const [open, setOpen] = useState(false)
  const [definition, setDefinition] = useState('')

  useEffect(() => {
    const func = async () => {
      const def = await getDefinition(1)
      setDefinition(def)
    }
    func()
  }, [])

  return (
    <span
      className='cursor-pointer inline-block z-20 relative border-b-2 border-dashed hover:border-solid border-primary-500 transition-all duration-300 -py-2'
      // style={{width: "100vw"}}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link className='border-dashed border-b-2 border-blue-600' to={href}>{text}</Link>

      {open && (
        <div className='absolute shadow-lg px-6 py-4 rounded-lg top-8 m-auto border bg-white text-sm text-justify min-w-96'>
          {definition
            ? <Latex><Markdown>{definition.content}</Markdown></Latex>
            : <LoadingIndicator className='w-96 h-20 flex items-center justify-center' />}
        </div>
      )}
    </span>
  )
}

export default DefinitionDisplay
