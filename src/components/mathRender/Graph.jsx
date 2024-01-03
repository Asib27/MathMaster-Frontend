import { useEffect, useState } from 'react'
import { Mafs, Coordinates, Plot, Theme, Point } from 'mafs'

import Latex from './Latex'

const colors = [
  'indigo',
  'red',
  'pink',
  'blue',
  'green',
  'violet',
  'orange',
  'yellow'
]
const colorValues = {
  red: '#f11d0e',
  orange: '#f14e0e',
  yellow: '#ffe44a',
  green: '#15e272',
  blue: '#58a6ff',
  indigo: '#7c58ff',
  violet: '#ae58ff',
  pink: '#ee00ab'
}

// const INTERPOLATION_SPEED = 1e6

const Graph = ({
  zoom = false,
  equations = [],
  parameters = [],
  ranges = [],
  box = { x: [-3, 3], y: [-3, 3] }
}) => {
  const [p, setP] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setP(parameters)
    setIsInitialized(true)
  }, [])

  const handleSlide = (val, i) => {
    setP((prev) => {
      const newP = [...prev]
      newP[i] = parseFloat(val, 10)
      return newP
    })
  }

  const showLabel = (range, n) => {
    const total = range[1] - range[0]
    const count = Math.round(total / 6)
    return n % count === 0 ? n : ''
  }

  // useEffect(() => {
  //   const sliderInterval = setInterval(() => {
  //     sliders.forEach((slider, i) => {
  //       if (slider.current?.value === undefined) return;

  //       let newValue = parseFloat(sliderVals[i]);
  //       let oldValue = p[i];

  //       let delta = newValue - oldValue;
  //       let sign = delta / Math.abs(delta);
  //       let v = oldValue + sign * INTERPOLATION_SPEED;

  //       v = newValue;

  //       if (!isNaN(v) && p[i] !== v) handleSlide(v, i);
  //     })
  //   }, 50);

  //   return () => {
  //     clearInterval(sliderInterval);
  //   };
  // }, [p]);

  if (isInitialized) {
    return (
      <div className='max-w-md mx-auto relative my-2'>
        <div className='absolute top-12 right-0'>
          {equations.map((eq, i) => {
            const color = colors[i % colors.length]
            if (eq.type === 'plot') {
              return (
                <Latex key={i} index={i}>
                  <span style={{ color: colorValues[color] }}>${eq.text}$</span>
                </Latex>
              )
            }
            return <div key={i} />
          })}
        </div>
        <Mafs
          zoom={zoom}
          viewBox={{
            x: [box.x[0], box.x[1]],
            y: [box.y[0], box.y[1]]
          }}
        >
          <Coordinates.Cartesian
            xAxis={{
              lines: false,
              labels: (n) => showLabel(box.x, n)
            }}
            yAxis={{ lines: false, labels: (n) => showLabel(box.y, n) }}
          />
          {equations.map((eq, index) => {
            const color = colors[index % colors.length]
            if (eq.y && eq.type === 'plot') {
              return (
                <div key={index}>
                  <Plot.OfX y={eval(eq.y)} color={Theme[color]} key={index} />
                </div>
              )
            } else if (eq.x && eq.type === 'plot') {
              return (
                <div key={index}>
                  <Plot.OfY x={eval(eq.x)} color={Theme[color]} key={index} />
                </div>
              )
            } else if (eq.type === 'point') {
              return <Point x={eq.x} y={eq.y} color={Theme.red} key={index} />
            } else {
              return <div key={index} />
            }
          })}
        </Mafs>

        {ranges.map((pp, i) => (
          <div
            className='w-48 mx-auto mt-8 flex justify-between items-center gap-x-2'
            key={i}
          >
            <span>{pp[0]}</span>
            <input
              className='appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-[6px] [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-[2px] [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary-500 cursor-grab active:curson-grabbing [&::-webkit-slider-thumb]:ring [&::-webkit-slider-thumb]:ring-secondary-500/40'
              type='range'
              min={pp[1]}
              max={pp[2]}
              step={pp[3] || '0.1'}
              value={p[i]}
              onChange={(e) => {
                handleSlide(e.target.value, i)
              }}
            />
            <span>{parseFloat(p[i]).toFixed(2)}</span>
          </div>
        ))}
      </div>
    )
  } else <>Loading...</>
}

export default Graph
