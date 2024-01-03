import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'

import Callout from './mathRender/Callout'
// import Test from './mathRender/Test'
// import Graph from './mathRender/Graph'
// import Highlight from './mathRender/Highlight'
// import Definition from './mathRender/Definition'
// import Example from './mathRender/Example'
// import ShortAnswer from './mathRender/ShortAnswer'

import { parse } from '../services/parser'

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
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code ({ inline, className, children, ...props }) {
            if (inline) return <code {...props}>{children}</code>
            const value = String(children).replace(/\n$/, '')
            const parsedValue = parse(value)

            if (className === 'language-callout') {
              return (
                <Callout>{parsedValue}</Callout>
              )
            }

            return (
              <b>Unknown command</b>
            )
          },
          inlinemath ({ props }) {
            console.log(props)
          }
        }}
      >{data}
      </Markdown>
    </div>
  )
}

export default MDXViewer
