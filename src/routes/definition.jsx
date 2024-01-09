import { useLoaderData } from 'react-router-dom'
import { getDefinition } from '../services/definitionService,js'
import MDXViewer from '../components/MDXViewer'

export async function loader ({ params }) {
  const def = await getDefinition(params.definitionId)
  return { def }
}

export default function Definition () {
  const { def } = useLoaderData()

  return (
    <div className='m-10'>
      <div className='text-2xl'>{def.name}</div>
      <MDXViewer data={def.content} className='my-10 mr-20 text-justify' />
    </div>
  )
}
