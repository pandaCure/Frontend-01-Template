// export interface IComposeObj {
//   name: string[]
//   path: string[]
// }
interface IComposeObj {
  innerObj: any
  path: string[]
}
type ComposeArrContentType = IComposeObj
const innerGlobalObject = [
  'eval',
  'isFinite',
  'isNaN',
  'parseFloat',
  'parseInt',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'Array',
  'Date',
  'RegExp',
  'Promise',
  'Proxy',
  'Map',
  'WeakMap',
  'Set',
  'WeakSet',
  'Function',
  'Boolean',
  'String',
  'Number',
  'Symbol',
  'Object',
  'Error',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'DataView',
  'Float32Array',
  'Float64Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint16Array',
  'Uint32Array',
  'Uint8ClampedArray',
  'Atomics',
  'JSON',
  'Math',
  'Reflect'
]
const isFunction = (func: any) =>
  Object.prototype.toString.call(func) === '[object Function]'
const isObject = (obj: any) =>
  Object.prototype.toString.call(obj) === '[object Object]'

const getComposeInnerGlobalObject = (arr: string[]) => {
  const initArr: IComposeObj[] = []
  return arr.reduce((init, value) => {
    initArr.push({
      path: [value],
      innerObj: (<any>window)[value]
    })
    return initArr
  }, initArr)
}
const handleComposeInnerGlobalObject = (
  composeInnerGlobalObject: IComposeObj[]
) => {
  const saveGetAllInnerObj: Set<IComposeObj> = new Set()
  const flag = new Set()
  while (composeInnerGlobalObject.length) {
    const currentHandleObj = composeInnerGlobalObject.shift()
    if (!currentHandleObj) break
    const innerObj = currentHandleObj.innerObj
    if (flag.has(innerObj)) continue
    flag.add(innerObj)
    saveGetAllInnerObj.add(currentHandleObj)
    for (let proto of Object.getOwnPropertyNames(innerObj)) {
      console.log(proto)
      const ownerPrototype = Object.getOwnPropertyDescriptor(innerObj, proto)
      console.log(Object.prototype.toString.call(ownerPrototype?.value))
      if (
        ownerPrototype &&
        ownerPrototype.value &&
        (isFunction(ownerPrototype.value) ||
          isObject(ownerPrototype.value) ||
          typeof ownerPrototype.value === 'object' ||
          typeof ownerPrototype.value === 'function')
      ) {
        console.log(ownerPrototype)
        composeInnerGlobalObject.push({
          path: currentHandleObj.path.concat([proto]),
          innerObj: ownerPrototype.value
        })
      }
      if (
        ownerPrototype &&
        ownerPrototype.get &&
        isFunction(ownerPrototype.get)
      ) {
        composeInnerGlobalObject.push({
          path: currentHandleObj.path.concat([proto]),
          innerObj: ownerPrototype.get
        })
      }
      if (
        ownerPrototype &&
        ownerPrototype.set &&
        isFunction(ownerPrototype.set)
      ) {
        composeInnerGlobalObject.push({
          path: currentHandleObj.path.concat([proto]),
          innerObj: ownerPrototype.set
        })
      }
    }
  }
  return saveGetAllInnerObj
}
// TODO: 递归类型 和 递归数据的 类型 该怎么写
const handlePath = (path: string[], reaml: any) => {
  const v = path.shift()
  const isExist = reaml.children.find((value: any) => value.id === v)
  if (isExist && path.length !== 0) {
    handlePath(path, isExist)
  } else {
    reaml.children.push({
      id: v,
      children: []
    })
  }
}
interface IReaml {
  id: string
  children?: IReaml[]
}
const handleInnerGlobalObject = (arr: string[]) => {
  let reaml: IReaml = {
    id: 'Reaml',
    children: []
  }
  const needGetOwnProperty = getComposeInnerGlobalObject(arr)
  const handleData = handleComposeInnerGlobalObject(needGetOwnProperty)
  const convertSetToArr = Array.from(handleData)
  convertSetToArr.forEach(({ path }) => handlePath(path, reaml))
  console.log(reaml)
  return reaml
}
const contextValue = ''
export { innerGlobalObject, handleInnerGlobalObject, contextValue }
