import Markdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import rehypeKatex from 'rehype-katex'

import Callout from './mathRender/Callout'
// import Test from './mathRender/Test'
// import Graph from './mathRender/Graph'
// import Highlight from './mathRender/Highlight'
import Definition from './mathRender/Definition'
// import ShortAnswer from './mathRender/ShortAnswer'

import { parse } from '../services/parser'
import { Link } from 'react-router-dom'
import ProblemContainer from './mathRender/ProblemContainer'

// const components = {
//   Test,
//   Graph,
//   Highlight,
//   Callout,
//   Definition,
//   Example,
//   ShortAnswer,
// };

const MDXViewer = ({ data }) => {
  console.log(data)
  return (
    <div className='relative'>
      <Markdown
        components={{
          code ({ inline, className, children, ...props }) {
            if (inline) return <code {...props}>{children}</code>
            const value = String(children).replace(/\n$/, '')
            const parsedValue = parse(value)

            if (className === 'language-callout') {
              return (
                <Callout>{parsedValue}</Callout>
              )
            } else if (className === 'language-definition') {
              return (
                <Definition>{parsedValue}</Definition>
              )
            } else if (className === 'language-example') {
              console.log(parsedValue)
              return <ProblemContainer {...parsedValue} />
            }

            return (
              <b>Unknown command</b>
            )
          },
          a ({ href, children }) {
            return <Link className='border-dashed border-b-2 border-blue-600' to={href}>{children}</Link>
          }
        }}
      >{data}
      </Markdown>
    </div>
  )
}

export default MDXViewer
