
export const parse = (json: string): any => {
  if (json === undefined) {
    return undefined
  }
  try {
    return JSON.parse(json ?? '{}')
  } catch (err) {
    return {}
  }
}

export const stringify = (obj: any): string | undefined => {
  if (obj === undefined) {
    return undefined
  }
  if (typeof obj === 'string') {
    obj = parse(obj)
  }
  try {
    return JSON.stringify(obj)
  } catch (err) {
    return '{}'
  }
}
