import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

const Latex = ({children}) => {
  return (
    <MathJaxContext version={3} config={config}>
      <MathJax>
        {children}
      </MathJax>
    </MathJaxContext>
  )
}

export default Latex