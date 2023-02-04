<img width="1900" alt="Screenshot 2023-01-29 at 2 55 53 PM" src="https://user-images.githubusercontent.com/5169985/215355352-75a389ac-8374-4262-8dfb-dd34246a5aac.png">

<h1 align="center">⚛️ leucine</h1>
<p align="center">A tiny, hybrid logging framework for client and server side applications.</p>

- ✅ formatted, easy-to-read logs
- ✅ automatic distinction between server-side and client-side logging
- ✅ emoji first logging indicators
- ✅ comes with 4 logging states (debug, info, warn, error)
- ✅ easily configurable

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

debug(sum(1,2)); //🐛 [01/01/2023 12:00:00] (debug) in index.ts: 3

```

Leucine formats logs in both the server side and client side environment, giving you a roundabout logging experience.

## 📘 Documentation

### Configuring leucine
Leucine ships with a sensible, default configuration. Nonetheless, if you'd like to tinker with the defaults then you can do so in two ways:
1. Import the named `configure` function
2. Import the `Leucine` class and instantiate a new class with your configuration.

Both methods are viable, pick the one you're most comfortable with (using a function vs. using a class).

Then, pass in your configuration. Below we represent the available keys you can use to configure leucine:

```ts
import {configure} from "leucine" // function-based
import Leucine from "leucine" // class-based

configure({
    debugColor?: Colors;
	infoColor?: Colors;
	warnColor?: Colors;
	errorColor?: Colors;
	displayDate?: boolean;
	dateFormat?: DateFormat;
	displayTime?: boolean;
	showMilliseconds?: boolean;
	displayArgTypes?: boolean;  
})

const logger = new Leucine({
    debugColor?: Colors;
	infoColor?: Colors;
	warnColor?: Colors;
	errorColor?: Colors;
	displayDate?: boolean;
	dateFormat?: DateFormat;
	displayTime?: boolean;
	showMilliseconds?: boolean;
	displayArgTypes?: boolean;
})
```

To configure **colors**, import the `Colors` enum from leucine and use it when overriding the default colors:
```ts
import {Colors} from "leucine"

const configuration = {
    debugColor: Color.Red;
    //...
}
```

To configure **date formatting**, import the `DateFormat` enum from leucine and use it to override the default date formating:
```ts
import {DateFormat} from "leucine"
const configuration = {
    dateFormat: DateFormat.YEAR_MONTH_DAY   
    //...
}
```

## Passing variable args to `log`
To pass a variable amount of arguments to log to the console or to log multiple things, use an array like so:

```ts
import {debug} from "leucine"

const someVar = "I'm a variable!"

debug(["This is a string", someVar, 10]) // 🐛 (debug): ["This is a string", "I'm a variable", 10]
```

## ⚙️ API Reference

### `Leucine(config)`
- `config: LeucineConfig`
- Returns instantiated `Leucine` class

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

### `configure(config)`
- `config: LeucineConfig`
- Returns `void`
