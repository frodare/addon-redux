
export const parse = (json: string): any => {
  try {
    return JSON.parse(json ?? '{}')
  } catch (err) {
    return {}
  }
}

export const stringify = (obj: any): string => {
  if (typeof obj === 'string') {
    obj = parse(obj)
  }
  try {
    return JSON.stringify(obj)
  } catch (err) {
    return '{}'
  }
}
