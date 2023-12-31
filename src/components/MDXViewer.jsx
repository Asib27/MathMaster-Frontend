import Markdown from 'react-markdown'
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";

import Callout from "./mathRender/Callout"
import Test from "./mathRender/Test"
import Graph from "./mathRender/Graph"
import Highlight from "./mathRender/Highlight"
import Definition from "./mathRender/Definition";
import Example from "./mathRender/Example";
import ShortAnswer from "./mathRender/ShortAnswer";

const components = {
  Test,
  Graph,
  Highlight,
  Callout,
  Definition,
  Example,
  ShortAnswer,
};

const MDXViewer = ({ data }) => {
    console.log(data)
    return (
    <div className="relative">
      <Markdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
            code({ inline, className, children, ...props }) {
                const value = String(children).replace(/\n$/, '');
                if (inline) return <code {...props}>{children}</code>
              
                if (className === "language-callout") return (
                  <Callout>{value}</Callout>
                )
              
                return (
                  <b>Unknown command</b>
                )
            }
        }}
        
      >{data}</Markdown>
    </div>
  );
};

export default MDXViewer;
