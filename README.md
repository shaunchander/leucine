
<h1 align="center">⚛️ leucine</h1>
<p align="center">A tiny, hybrid logging framework for the client and server side applications.</p>

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

Then, import `log`, the main, named export from leucine:
```ts
import { log } from "leucine"
```

🎉 You're now ready to start logging:
```ts
const sum = (a, b) => a + b;

log(sum(1,2)); // 🐛 (debug): 5

```

By default, leucine will use debug mode. Refer to documention below to see how to configure the logging mode.

## 📘 Documentation

### Changing the logging mode
By default, leucine defaults to debug mode for all console logging. To change modes, simply pass the mode as a string as the second parameter to the `log` function like so:

```ts
// Info.
log("This is an info log.", "info") // ℹ️ (info): ...

// Warn.
log("This is a warn log.", "warn") // ⚠️ (warn): ...

// Error.
log("This is an error log.", "error") // ⛔️ (error): ...
```

Valid modes are: `debug`, `info`, `warn`, and `error`

**Note that leucine only formats logs and does not throw any exceptions on console warnings/errors**.

## Passing variable args to `log`
To pass a variable amount of arguments to log to the console, use an array like so:

```ts
const someVar = "I'm a variable!"

log(["This is a string", someVar, 10]) // 🐛 (debug): ["This is a string", "I'm a variable", 10]
```

## ⚙️ API Refrence

### `log(arg, level = "debug")`
- `arg: T`
- `level: "debug" | "info" | "warn" | "error"`
- Returns `void`

