export enum LogType {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

const levelIndicators = {
  debug: `🐛 `,
  info: `ℹ️  `,
  warn: `⚠️  `,
  error: `⛔️ `,
};

const levelBackgroundColors = {
  debug: ["\x1b[48;5;240m", "darkgray"],
  info: ["\x1b[48;5;18m", "cornflowerblue"],
  warn: ["\x1b[48;5;208m", "darkorange"],
  error: ["\x1b[48;5;88m", "darkred"],
};

export const log = <T>(arg: T, level: LogType = LogType.DEBUG) => {
  // @ts-ignore
  if (typeof window === "undefined") {
    console.log(
      `\x1b[1m${levelBackgroundColors[LogType[level].toLowerCase()][0]}${
        levelIndicators[LogType[level].toLowerCase()]
      }(${LogType[level]
        .split("")
        .map((x) => x[0] + x.substring(1).toLowerCase())
        .join("")}) in ${import.meta.file ?? import.meta.url}\x1b[0m\n\n`,
      arg,
      "\n"
    );
  } else {
    console.log(
      `%c${levelIndicators[LogType[level].toLowerCase()]}(${level
        .split("")
        .map((x) => x[0] + x.substring(1).toLowerCase())
        .join("")})\n\n`,
      `color:white;background-color:${
        levelBackgroundColors[LogType[level].toLowerCase()][1]
      };`,
      arg,
      "\n\n"
    );
  }
};

export const error = <T>(arg: T) => {
  log(arg, LogType.ERROR);
};

export const debug = <T>(arg: T) => {
  log(arg, LogType.DEBUG);
};

export const info = <T>(arg: T) => {
  log(arg, LogType.INFO);
};

export const warn = <T>(arg: T) => {
  log(arg, LogType.WARN);
};
