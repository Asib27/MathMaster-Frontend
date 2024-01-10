// import { useEffect, useState } from 'react'
import { Mafs, Coordinates, Plot, Theme, Point, Text } from 'mafs'

// import Latex from './Latex'
import { getAllPointFromEquaitons, getExplicitEquation } from '../../services/parser'
import * as math from 'mathjs'
// const INTERPOLATION_SPEED = 1e6

const Graph = ({
  equations
}) => {
  // console.log(equations)
  const points = getAllPointFromEquaitons(equations)
  const params = {
    a: 1,
    b: 2,
    c: 1
  }

  return (
    <div>
      <Mafs>
        <Coordinates.Cartesian />
        {points.map((point, idx) => {
          return <Point key={idx} {...point} />
        })}

        {equations.filter(eq => eq.type === 'plot').map((eq, idx) => {
          const { left, right } = getExplicitEquation(eq.equation)
          const expr = math.compile(right)

          if (left === 'x') {
            const evalFn = (y) => expr.evaluate({ ...params, y })
            return <Plot.OfY key={idx} x={evalFn} color={eq.color}>Equation x</Plot.OfY>
          } else if (left === 'y') {
            const evalFn = (x) => expr.evaluate({ ...params, x })
            return <Plot.OfX key={idx} y={evalFn} color={eq.color} />
          }

          // return <></>
        })}
      </Mafs>
    </div>
  )
}

export default Graph
