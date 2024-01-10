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
  console.log(equation)

  const splited = equation.split(',').map(s => s.trim())

  const parsed = {
    type: splited[0],
    color: splited[1]
  }
  if (splited[0] === 'plot') {
    parsed.equation = splited[2]
    parsed.range = []
    for (let i = 3; i < splited.length; i++) {
      const [low, variable, high, err] = splited[i].split('<').map(s => s.trim())

      if (err || !low || !high || !variable) console.error('Invalid format: should be in low < variable < high format')
      parsed.range.push({ low, variable, high })
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
