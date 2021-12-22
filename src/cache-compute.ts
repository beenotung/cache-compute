export function makeSyncComputeCacheByArguments<
  F extends(...args: any[]) => any,
>(computeFn: F, callback: (result: ReturnType<F>) => void) {
  let lastArgument: IArguments | undefined
  function run(args: IArguments) {
    lastArgument = args
    const result = computeFn.apply(null, args as unknown as Parameters<F>)
    callback(result)
  }
  function check() {
    if (!lastArgument || lastArgument.length !== arguments.length) {
      return run(arguments)
    }
    for (let i = 0; i < arguments.length; i++) {
      if (lastArgument[i] !== arguments[i]) {
        return run(arguments)
      }
    }
  }
  return check as (...args: Parameters<F>) => void
}

export function makeAsyncComputeCacheByArguments<
  F extends(...args: any[]) => Promise<any>,
>(computeFn: F, callback: (result: ReturnType<F>) => void) {
  let lastArgument: IArguments | undefined
  async function run(args: IArguments) {
    lastArgument = args
    const result = await computeFn.apply(null, args as unknown as Parameters<F>)
    callback(result)
  }
  function check() {
    if (!lastArgument || lastArgument.length !== arguments.length) {
      return run(arguments)
    }
    for (let i = 0; i < arguments.length; i++) {
      if (lastArgument[i] !== arguments[i]) {
        return run(arguments)
      }
    }
  }
  return check as (...args: Parameters<F>) => Promise<void>
}

export function makeSyncComputeCacheByOptions<Options extends object, R>(
  computeFn: (options: Options) => R,
  callback: (result: R) => void,
) {
  let lastOptions: Options | undefined
  let lastKeys: Array<keyof Options> | undefined
  function run(options: Options, keys: Array<keyof Options>) {
    lastOptions = options
    lastKeys = keys
    const result = computeFn.call(null, options)
    callback(result)
  }
  function check(options: Options) {
    const keys = Object.keys(options) as Array<keyof Options>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!lastOptions || lastKeys!.length !== keys.length) {
      return run(options, keys)
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof Options
      if (lastOptions[key] !== options[key]) {
        return run(options, keys)
      }
    }
  }
  return check as (options: Options) => void
}

export function makeAsyncComputeCacheByOptions<Options extends object, R>(
  computeFn: (options: Options) => Promise<R>,
  callback: (result: R) => void,
) {
  let lastOptions: Options | undefined
  let lastKeys: Array<keyof Options> | undefined
  async function run(options: Options, keys: Array<keyof Options>) {
    lastOptions = options
    lastKeys = keys
    const result = await computeFn.call(null, options)
    callback(result)
  }
  function check(options: Options) {
    const keys = Object.keys(options) as Array<keyof Options>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!lastOptions || lastKeys!.length !== keys.length) {
      return run(options, keys)
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof Options
      if (lastOptions[key] !== options[key]) {
        return run(options, keys)
      }
    }
  }
  return check as (options: Options) => Promise<void>
}

export type Callback<T> = (result: T) => void

export function newComputeByArgumentsCachePool<
  F extends(...args: any[]) => any,
>(computeFn: F) {
  const cache = new WeakMap<
    Callback<ReturnType<F>>,
    (...args: Parameters<F>) => void
  >()
  function cacheCompute(callback: Callback<ReturnType<F>>) {
    let compute = cache.get(callback)
    if (!compute) {
      compute = makeSyncComputeCacheByArguments(computeFn, callback)
      cache.set(callback, compute)
    }
    return compute
  }
  return cacheCompute
}

export function newComputeByOptionsCachePool<Options extends object, R>(
  computeFn: (options: Options) => R,
) {
  const cache = new WeakMap<Callback<R>, (options: Options) => void>()
  function cacheCompute(callback: Callback<R>) {
    let compute = cache.get(callback)
    if (!compute) {
      compute = makeSyncComputeCacheByOptions(computeFn, callback)
      cache.set(callback, compute)
    }
    return compute
  }
  return cacheCompute
}
