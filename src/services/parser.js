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
