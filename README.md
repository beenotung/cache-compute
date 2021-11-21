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

## Remark

Error handling is intentionally not handled by the checker function.
To handle errors properly, either do application-specific try-catch in the compute function or when calling the checker function.

## How it works

The input (a.k.a. dependencies) of a function is memorized.

When the checker function is called, it compares the current input against that last input.

If any of the input is changed, the provided function will be re-run, and the return value will be passed to the callback function.

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
