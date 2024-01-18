const defs = [
  {
    id: 1,
    name: 'Linear Function'
  },
  {
    id: 2,
    name: 'Quardatic Function'
  },
  {
    id: 3,
    name: 'Function'
  },
  {
    id: 4,
    name: 'Slope'
  }
]

const def1 = `In mathematics, a linear function is a function whose graph is a **straight line**. It is a polynomial function of degree **zero or one**. 

Linear functions are typically in the form $ y = mx + c $

A linear function has one independent variable and one dependent variable. The independent variable is $ x $ and the dependent variable is $ y $
`

const def2 = `In mathematics, a quadratic function is a polynomial function defined by a **quadratic polynomial**. A quadratic polynomial is a polynomial of degree two in one or more variables.
The graph of a quadratic function is a **parabola**, which is a type of two-dimensional curve. Parabolas can open upward or downward, and vary in "width" or "steepness", but they all have the same basic "U" shape. 

A quadratic function can be written in the form $f(x) = ax^2 + bx + c $, where a, b, and c are all non-zero values. A quadratic function can be identified if the highest exponent of the function is **2** 
`

const def3 = 'The slope of a line is the ratio between the change of and the change of . It describes the steepness of a line.'

const fullDefs = [
  {
    id: 1,
    name: 'Linear Function',
    content: def1
  },
  {
    id: 2,
    name: 'Quadratic Function',
    content: def2
  },
  {
    id: 3,
    name: 'Function',
    content: def2
  },
  {
    id: 4,
    name: 'Slope',
    content: def3
  }
]

export async function getDefinitions (query) {
  await fakeNetwork()
  if (!query) return defs
  else return defs.filter((def) => def.name.toLowerCase().includes(query))
}

export async function getDefinition (definitionId) {
  await fakeNetwork()
  return fullDefs[definitionId - 1]
}

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
