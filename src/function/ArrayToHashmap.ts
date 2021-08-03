export const ArrayToHashmap = (arr: any[], index: string): object => {
  return arr.reduce(function (map, obj) {
    map[index] = obj
    return map
  }, {})
}
