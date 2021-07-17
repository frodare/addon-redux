const PATH_SEPARATOR = /[^.[\]]+/g

const isNotObject = (o: any): boolean => Object(o) !== o

const isArrayIndexable = (s: any): boolean => Math.abs(s) >> 0 === +s

const seedObject = (nextPathPart: string): any => isArrayIndexable(nextPathPart) ? [] : {}

const set = (obj: any, path: string, value: any): any => {
  if (path === null || path === undefined) return obj
  if (isNotObject(obj)) return obj
  const aPath = path.match(PATH_SEPARATOR) ?? []
  const max = aPath.length - 1

  let clone: any
  let prevBranch: any
  let prevPath: string

  const reduceObjectBranch = (branch: any, pathPart: string, i: number): any => {
    const branchClone = Array.isArray(branch) ? [...branch] : { ...branch }

    // mutate cloned branch
    if (i === max) {
      branchClone[pathPart] = value
    } else if (isNotObject(branchClone[pathPart])) {
      branchClone[pathPart] = seedObject(aPath[i + 1])
    }

    // update cloned object with the new branch
    if (i === 0) {
      clone = branchClone
      prevBranch = clone
    } else {
      prevBranch[prevPath] = branchClone
      prevBranch = branchClone
    }
    prevPath = pathPart

    // return the next branch for iteration
    return branchClone[pathPart]
  }

  aPath.reduce(reduceObjectBranch, obj)

  return clone
}

export default set
