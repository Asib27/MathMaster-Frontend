// import { useEffect, useState } from 'react'
import { Mafs, Coordinates, Plot, Theme, Point, Text, MovablePoint, vec, Circle, useMovablePoint } from 'mafs'

// import Latex from './Latex'
import { getAllPointFromEquaitons, getExplicitEquation } from '../../services/parser'
import * as math from 'mathjs'
import { useEffect, useState } from 'react'
// const INTERPOLATION_SPEED = 1e6

const Graph = ({
  equations
}) => {
  const points = getAllPointFromEquaitons(equations)
  const [params, setParams] = useState({
    a: 1,
    b: 2,
    c: 1
  })
  const sep = useMovablePoint([1, 0], {
    constrain: 'horizontal'
  })

  return (
    <div>
      <Mafs className='touch-none'>
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

          return <div key={idx} />
        })}

        <Point x='0' y='0' />
      </Mafs>

      {Object.keys(params).map(key => {
        const point = [params[key], 0]
        return (
          <div key={key} className='  '>
            <Mafs
              height='40' viewBox={{
                x: [-19, 10],
                y: [-0.25, 0.25],
                padding: 0
              }}
            >
              <MovablePoint
                point={point}
                onMove={([x, y]) => {
                  setParams({ ...params, c: x })
                }}
                color='blue'
              />
            </Mafs>
          </div>
        )
      })}
    </div>
  )
}

export default Graph
