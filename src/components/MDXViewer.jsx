import Markdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import rehypeKatex from 'rehype-katex'

import Callout from './mathRender/Callout'
// import Test from './mathRender/Test'
// import Graph from './mathRender/Graph'

import { parse } from '../services/parser'
import ProblemContainer from './mathRender/ProblemContainer'
import Latex from './mathRender/Latex'
import DefinitionDisplay from './mathRender/DefinitionDisplay'

const MDXViewer = ({ data, className }) => {
  return (
    <div className={className + ' text-justify'}>
      <Latex>
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
              } else if (className === 'language-question') {
                console.log(parsedValue)
                return <ProblemContainer {...parsedValue} />
              }

              return (
                <b>Unknown command</b>
              )
            },
            a ({ href, children }) {
              return <DefinitionDisplay href={href} text={children} />
            }
          }}
        >{data}
        </Markdown>
      </Latex>
    </div>
  )
}

export default MDXViewer
