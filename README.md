<img width="1900" alt="Screenshot 2023-01-29 at 2 55 53 PM" src="https://user-images.githubusercontent.com/5169985/215355352-75a389ac-8374-4262-8dfb-dd34246a5aac.png">

<h1 align="center">⚛️ leucine</h1>
<p align="center">A tiny, hybrid logging framework for client and server side applications.</p>

- ✅ formatted, easy-to-read logs
- ✅ automatic distinction between server-side and client-side logging
- ✅ emoji first logging indicators
- ✅ comes with 4 logging states (debug, info, warn, error)

## Getting started

First, install leucine using npm/yarn/pnpn:
```bash
## npm
npm i leucine --save-dev

## yarn
yarn add leucine -D

## pnpm
pnpm add leucine -D
```

Then, import any of the logging modes as named imports:
```ts
import { debug, info, warn, error } from "leucine"
```

🎉 You're now ready to start logging:
```ts
const sum = (a, b) => a + b;

log(debug(1,2)); // 🐛 (debug): 5

```

Leucine makes a distinction where you're trying to log. If you're logging on the server-side (ie: window is not defined), then leucine will use ASCII escape characters to format your logs output. If on the browser, leucine will use CSS to style console outputs.

**☝️ Note that your operating system or installed emoji typefaces may affect how the emoji indicators get displayed**.

## 📘 Documentation

### Changing the logging mode
Leucine ships with 4 logging modes: `debug`, `info`, `warn`, and `error`. Each of which are available as a named import from the package.

**Tips for when to use a certain logging mode:**
- Use `debug` whenever you need to check the value of something, it should replace your use of `console.log`
- Use `info` for transactional logs and indicators of when processes begin/end
- Use `warn` when something goes wrong but is not critical enough to break the application
- Use `error` in any instance where the application breaks/crashes.

```ts

import {debug, info, warn, error}

// Debug.
debug("This is a debug log") // 🐛 (debug): ...

// Info.
info("This is an info log.") // ℹ️ (info): ...

// Warn.
warn("This is a warn log.") // ⚠️ (warn): ...

// Error.
error("This is an error log.") // ⛔️ (error): ...
```

**☝️ Note that leucine only formats logs and does not throw any exceptions on console warnings/errors**.

## Passing variable args to `log`
To pass a variable amount of arguments to log to the console or to log multiple things, use an array like so:

```ts
const someVar = "I'm a variable!"

log(["This is a string", someVar, 10]) // 🐛 (debug): ["This is a string", "I'm a variable", 10]
```

## ⚙️ API Refrence

### `debug(arg)`
- `arg: T`
- Returns `void`

### `info(arg)`
- `arg: T`
- Returns `void`

### `warn(arg)`
- `arg: T`
- Returns `void`

### `error(arg)`
- `arg: T`
- Returns `void`
