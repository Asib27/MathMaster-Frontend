// import { useEffect, useState } from 'react'
import { Mafs, Coordinates, Plot, Theme, Point, Text } from 'mafs'

// import Latex from './Latex'
import { getAllPointFromEquaitons } from '../../services/parser'

// const INTERPOLATION_SPEED = 1e6

const Graph = ({
  equations
}) => {
  // console.log(equations)

  const points = getAllPointFromEquaitons(equations)
  console.log(points)

  return (
    <div>
      <Mafs>
        <Coordinates.Cartesian />
        {points.map((point, idx) => {
          return <Point key={idx} {...point} />
        })}
      </Mafs>
    </div>
  )
}

export default Graph
