import {
  newComputeByArgumentsCachePool,
  newComputeByOptionsCachePool,
  Callback,
} from 'cache-compute'

type State = { acc: number }

let sum2 = (a: number, b: number): number => {
  console.log('perform some expensive computation...:', [a, b])
  return a + b
}
let sum2Cache = newComputeByArgumentsCachePool(sum2)

type SumOptions = { a: number; b: number }
let sumDict = ({ a, b }: SumOptions): number => {
  console.log('perform some expensive computation...:', { a, b })
  return a + b
}
let sumDictCache = newComputeByOptionsCachePool(sumDict)

export let selector_dict = {
  getBigger2(
    state: State,
    options: { delta: number },
    callback: Callback<number>,
  ) {
    let compute = sum2Cache(callback)
    compute(state.acc, options.delta)
  },
  getBiggerDict(
    state: State,
    options: { delta: number },
    callback: Callback<number>,
  ) {
    let compute = sumDictCache(callback)
    let a = state.acc
    let b = options.delta
    compute({ a, b })
  },
}
