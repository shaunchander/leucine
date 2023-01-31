export const enum LogType {
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
  const logName = LogType[level];
  const lowerLogName = logName.toLowerCase();
  const capitalisedLogName = logName[0] + lowerLogName.substring(1);

  const backgroundColor = levelBackgroundColors[lowerLogName];
  const indicator = levelIndicators[lowerLogName];

  const fileName = import.meta.file ?? import.meta.url;
  // @ts-ignore
  if (typeof window === "undefined") {
    console.log(
      `\x1b[1m${backgroundColor[0]}${indicator} (${capitalisedLogName}) in ${fileName}\x1b[0m\n\n`,
      arg,
      "\n"
    );
  } else {
    console.log(
      `%c${indicator} (${capitalisedLogName})\n\n`,
      `color:white;background-color:${backgroundColor[1]};`,
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
