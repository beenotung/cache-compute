# cache-compute

Memorize and re-run a function when its arguments are changed.
The output is passed to callback function upon each update.

[![npm Package Version](https://img.shields.io/npm/v/cache-compute.svg?maxAge=3600)](https://www.npmjs.com/package/cache-compute.ts)

## Main Functions

- Memorize function arguments

## Feature

- Built-in Typescript support
- 100% tested with ts-mocha

## How it works

The input (a.k.a. dependencies) of a function is memorized.

When the checker function is called, it compares the current input against that last input.

If any of the input is changed, the provided function will be re-run, and the return value will be passed to the callback function.
