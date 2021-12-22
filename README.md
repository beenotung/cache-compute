# cache-compute

Memorize and re-run a function when its arguments are changed.
The output is passed to callback function upon each update.

[![npm Package Version](https://img.shields.io/npm/v/cache-compute.svg?maxAge=3600)](https://www.npmjs.com/package/cache-compute.ts)

## Main Functions

- Memorize variadic function by arguments (compare each argument)
- Memorize unary function by options object (compare each key-value pairs)

## Features

- Built-in Typescript support
- 100% tested with ts-mocha
- No dependencies\*

\*: except tslib to support await for pre-es2017 runtime

## Usage Example

### Using compute cache pool

<details>
<summary>Typescript Example</summary>

```typescript
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
```

</details>

More example refers to [demo-selector.ts](./example/demo-selector.ts) and [cache-compute.spec.ts](./test/cache-compute.spec.ts)

### Using compute cache directly

<details>
<summary>Typescript Example</summary>

```typescript
import { makeSyncComputeCacheByArguments } from 'cache-compute'

let users = [
  { name: 'Alice', birthday: new Date('2000-01-01').getTime() },
  { name: 'Bob', birthday: new Date('2000-02-02').getTime() },
]

const YEAR = 1000 * 60 * 60 * 24 * 365.25
function toProfile(user) {
  const now = Date.now()
  return {
    name: user.name,
    age: Math.floor((now - user.birthday) / YEAR),
  }
}

function updateUser(index, user) {
  users = [...users]
  users[index] = { ...users[index], ...user }
  runSelectors()
}

let selectors = []
function runSelectors() {
  selectors.forEach(fn => fn())
}

function watchProfile(index) {
  const watchUsers = profile =>
    // e.g. push to websocket client
    console.log({ index, profile })
  const checkUsers = makeSyncComputeCacheByArguments(toProfile, watchUsers)
  const selector = () => checkUsers(users[index])
  selector()
  selectors.push(selector)
}

console.log('== init ==')
watchProfile(0)
watchProfile(1)
// will print both user profiles

console.log('== update alice ==')
updateUser(0, { name: 'Alex' })
// only print first user profile

console.log('== update bob ==')
updateUser(1, { name: 'Bobby' })
// only print second user profile
```

</details>

More example refers to [demo.ts](./example/demo.ts) and [cache-compute.spec.ts](./test/cache-compute.spec.ts)

## How it works

The input (a.k.a. dependencies) of a function is memorized.

When the checker function is called, it compares the current input against that last input.

If any of the input is changed, the provided function will be re-run, and the return value will be passed to the callback function.

## Remark

Error handling is intentionally not handled by the checker function.
To handle errors properly, either do application-specific try-catch in the compute function or when calling the checker function.

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
