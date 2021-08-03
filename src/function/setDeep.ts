export const setDeep = (data: Object, path: string, value: any):any => {
  let schema: any = data // a moving reference to internal objects within obj

  const pList = path.split('.')

  const len = pList.length
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i]

    if (!schema[elem]) {
      if (Array.isArray(schema[elem])) { schema[elem] = [] } else { schema[elem] = {} }
    }
    schema = schema[elem]
  }

  schema[pList[len - 1]] = value
}
