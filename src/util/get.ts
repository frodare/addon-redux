
const PATH_SEPARATOR = /[,[\].]+?/

const reducePath = (res: any, key: string): any => res?.[key]

const get = (obj: any, path: string, defaultValue: any = undefined): any => {
  const result = path.split(PATH_SEPARATOR).reduce(reducePath, obj)
  return (result === undefined || result === obj) ? defaultValue : result
}

export default get
