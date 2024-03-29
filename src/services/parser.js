import { split } from 'postcss/lib/list'

export function validate (parsedValue, required) {
  return required.filter(key => !(key in parsedValue))
}

export function parse (str) {
  const parsedValue = {}

  split(str, '\n').forEach(line => {
    const [key, value] = line.split(':')
    const sanitizedKey = key.trim().toLowerCase()
    parsedValue[sanitizedKey] = value.trim()
  })

  return parsedValue
}

export function parseEquation (equation) {
  const splited = equation.split(',').map(s => s.trim())

  const parsed = {
    type: splited[0],
    color: splited[1]
  }
  if (splited[0] === 'plot') {
    parsed.equation = splited[2]
    parsed.range = []
    for (let i = 3; i < splited.length; i++) {
      const [low, variableInitial, high, err] = splited[i].split('<').map(s => s.trim())
      const [variable, initial] = variableInitial.split('=').map(s => s.trim())

      if (err || !low || !high || !variable) console.error('Invalid format: should be in low < variable < high format')
      parsed.range.push({ low, variable, high, initial })
    }
  } else if (splited[0] === 'points') {
    parsed.points = []
    for (let i = 2; i < splited.length; i++) {
      const trimed = splited[i].substring(1, splited[i].length - 1)
      const [x, y, err] = trimed.split(' ')

      if (err || !x || !y) console.error('Invalid format : should be in (x y)')
      parsed.points.push({ x, y })
    }
  }

  return parsed
}

export function getAllPointFromEquaitons (equations) {
  const points = []
  equations.filter(eq => eq.type === 'points').forEach(equation => {
    const color = equation.color
    equation.points.forEach(point => {
      points.push({ ...point, color })
    })
  })

  return points
}

export function getExplicitEquation (equation) {
  const [left, right, err] = equation.split('=').map(eq => eq.trim())
  if (err || !left || !right) console.error('Invalid equation ' + equation)

  if (left === 'y' || left === 'x') {
    return { left, right }
  }
}

export function getAllParams (equations) {
  const variables = {}
  const range = {}

  equations.filter(eq => eq.type === 'plot').forEach(eq => {
    eq.range.forEach(param => {
      variables[param.variable] = param.initial

      let interval = (param.high - param.low) / 5
      interval = Math.round(interval)
      range[param.variable] = { low: param.low, high: param.high, interval }
    })
  })

  return { variables, range }
}

export function parseViewParam (view) {
  if (!view) return null

  const [x, y] = view.split(',')
  const [lowX, , highX] = x.split('<').map(s => s.trim())
  const [lowY, , highY] = y.split('<').map(s => s.trim())
  const intervalX = Math.round((highX - lowX) / 7)
  const intervalY = Math.round((highY - lowY) / 7)

  return {
    x: { low: lowX, high: highX, interval: intervalX },
    y: { low: lowY, high: highY, interval: intervalY }
  }
}
