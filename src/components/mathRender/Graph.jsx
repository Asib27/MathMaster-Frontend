// import { useEffect, useState } from 'react'
import { Mafs, Coordinates, Plot, Point, Text, MovablePoint } from 'mafs'

// import Latex from './Latex'
import { getAllParams, getAllPointFromEquaitons, getExplicitEquation, parseViewParam } from '../../services/parser'
import * as math from 'mathjs'
import { useState } from 'react'
// const INTERPOLATION_SPEED = 1e6

const Graph = ({
  equations,
  view,
  className
}) => {
  const points = getAllPointFromEquaitons(equations)
  const {variables, range} = getAllParams(equations)
  const [params, setParams] = useState(variables)

  const viewBox = parseViewParam(view)
  console.log(viewBox)

  const width = 300
  const height = 300

  return (
    <div className={className + ' flex gap-10 items-center justify-center'}>
      <Mafs
        height={height}
        width={width}
        viewBox={{
          x: [+viewBox.x.low, +viewBox.x.high],
          y: [+viewBox.y.low, +viewBox.y.high],
        }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{
            lines: +viewBox.x.interval
          }}
          yAxis={{
            lines: +viewBox.y.interval
          }}
        />
        {points.map((point, idx) => {
          return <Point key={idx} {...point} />
        })}

        {equations.filter(eq => eq.type === 'plot').map((eq, idx) => {
          const { left, right } = getExplicitEquation(eq.equation)
          const expr = math.compile(right)

          if (left === 'x') {
            const evalFn = (y) => expr.evaluate({ ...params, y })
            return <Plot.OfY key={idx} x={evalFn} color={eq.color} />
          } else if (left === 'y') {
            const evalFn = (x) => expr.evaluate({ ...params, x })
            return <Plot.OfX key={idx} y={evalFn} color={eq.color} />
          }

          return <div key={idx} />
        })}

        <Point x='0' y='0' />
      </Mafs>

      <div>
        {Object.keys(params).map(key => {
          const {high, low, interval} = range[key]
          const point = [params[key], 0]

          return (
            <div key={key} className='  '>
              <Mafs
                height='80'
                width={width}
                viewBox={{
                  x: [+low, +high],
                  y: [-2, 1],
                  padding: 0.5
                }}
                preserveAspectRatio={false}
                pan={false}
                zoom={false}
              >
                <Coordinates.Cartesian
                  xAxis={{
                    lines: false,
                    labels: (n) => n % interval === 0 ? n : ''
                  }}
                  yAxis={{
                    axis: false,
                    lines: false,
                    labels: (n) => ''
                  }}
                />
                <MovablePoint
                  point={point}
                  onMove={([x, y]) => {
                    const toSet = { ...params }
                    toSet[key] = x
                    if(toSet[key] <= range[key].high && toSet[key] >= range[key].low)
                      setParams({ ...toSet })
                  }}
                  color='blue'
                />
                <Text x={0} y={-1.5} size={15}> {key} </Text>
              </Mafs>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Graph
