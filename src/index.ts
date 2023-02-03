export const enum LogType {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export const enum Colors {
  DARK_GRAY = "\x1b[48;5;240m",
  CORN_FLOWER_BLUE = "\x1b[48;5;18m",
  DARK_ORANGE = "\x1b[48;5;208m",
  DARK_RED = "\x1b[48;5;88m",
  BLACK = "\u001b[30m",
  RED = "\u001b[31m",
  GREEN = "\u001b[32m",
  YELLOW = "\u001b[33m",
  BLUE = "\u001b[34m",
  MAGENTA = "\u001b[35m",
  CYAN = "\u001b[36m",
  WHITE = "\u001b[37m",
  // add more if you wish
}

export const enum DateFormat {
  YEAR_MONTH_DAY,
  YEAR_DAY_MONTH,
  DAY_MONTH_YEAR,
  DAY_YEAR_MONTH,
  MONTH_DAY_YEAR,
  MONTH_YEAR_DAY,
}

const levelIndicators = {
  debug: `🐛 `,
  info: `ℹ️  `,
  warn: `⚠️  `,
  error: `⛔️ `,
};

type LeucineConfiguration = {
  debugColor?: Colors;
  infoColor?: Colors;
  warnColor?: Colors;
  errorColor?: Colors;
  displayDate?: boolean;
  dateFormat?: DateFormat;
  displayTime?: boolean;
  showMilliseconds?: boolean;
  displayArgTypes?: boolean;
};

class Leucine {
  private debugColor = Colors.DARK_GRAY;
  private infoColor = Colors.CORN_FLOWER_BLUE;
  private warnColor = Colors.DARK_ORANGE;
  private errorColor = Colors.DARK_RED;

  private displayDate = true;
  private dateFormat = DateFormat.DAY_MONTH_YEAR;
  private displayTime = true;
  private showMilliseconds = false;
  private displayArgTypes = false;

  constructor() {
    this.log("Loaded Leucine!", LogType.INFO);
  }

  /**
   * Recommended usage by power users only. For everyone else, use built in #set<type>() methods in builder pattern.
   * @param {LeucineConfiguration} config
   * @returns
   */
  public configure(config: LeucineConfiguration) {
    const keys = Object.keys(config);
    if (keys.length === 0)
      throw new Error(
        "Cannot configure Leucine with zero configuration options!"
      );
    for (const key of keys) {
      Object.assign(this, {
        [key]: config[key as keyof LeucineConfiguration],
      });
    }
    return this;
  }

  public setDisplayArgTypes(bool: boolean) {
    this.displayArgTypes = bool;
    return this;
  }

  /**
   * Toggle whether or not to show dates in log messages
   * @param bool
   * @returns
   */
  public setDisplayDate(bool: boolean) {
    this.displayDate = bool;
    return this;
  }

  /**
   * Change how dates are formatted in log messages
   * @param type
   * @returns
   */
  public setDateFormat(type: DateFormat) {
    this.dateFormat = type;
    return this;
  }

  /**
   * Toggle whether or not to show the time of the log in log messages
   * @param bool
   * @returns
   */
  public setDisplayTime(bool: boolean) {
    this.displayTime = bool;
    return this;
  }

  /**
   * Toggle whether or not to show milliseconds when displaying time is enabled
   * @param bool
   * @returns
   */
  public setShowMilliseconds(bool: boolean) {
    this.showMilliseconds = bool;
    return this;
  }

  /**
   * Set the color of any log message
   * @param type
   * @param color
   * @returns
   */
  public setColor(type: LogType, color: Colors) {
    Object.assign(this, {
      [`${type}Color`]: color,
    });
    return this;
  }

  private getDateStringified(inDate?: Date) {
    const date = inDate ?? new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    switch (this.dateFormat) {
      case DateFormat.DAY_MONTH_YEAR:
        return `${day}/${month}/${year}`;
      case DateFormat.DAY_YEAR_MONTH:
        return `${day}/${year}/${month}`;
      case DateFormat.MONTH_DAY_YEAR:
        return `${month}/${day}/${year}`;
      case DateFormat.MONTH_YEAR_DAY:
        return `${month}/${year}/${day}`;
      case DateFormat.YEAR_DAY_MONTH:
        return `${year}/${day}/${month}`;
      case DateFormat.YEAR_MONTH_DAY:
        return `${year}/${month}/${day}`;
    }
  }

  private getTimeStringified(inDate?: Date) {
    const date = inDate ?? new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = this.showMilliseconds
      ? date.getMilliseconds().toString().padStart(3, "0")
      : "";
    return `${hours}:${minutes}:${seconds}${
      this.showMilliseconds ? ":" : ""
    }${milliseconds}`;
  }

  public log<T>(arg: T | T[] | any[], level: LogType = LogType.DEBUG) {
    const backgroundColor = this[`${level}Color`];
    const indicator = levelIndicators[level];

    const fileName = import.meta.file ?? import.meta.url;

    const inDate = this.displayDate || this.displayTime ? new Date() : null;
    const date = this.displayDate
      ? ` ${this.getDateStringified(inDate as Date)}`
      : "";
    const time = this.displayTime
      ? ` ${this.getTimeStringified(inDate as Date)}`
      : "";

    const argTypes = this.displayArgTypes
      ? ` - ` +
        (Array.isArray(arg)
          ? `[${arg.map((x) => (typeof x).toString()).join(", ")}]`
          : (typeof x).toString())
      : "";

    console.log(
      `\x1b[1m${backgroundColor}${indicator}${date}${time} (${level}) in ${fileName}${argTypes}\x1b[0m\n\n`,
      ...(Array.isArray(arg) ? [...arg] : [arg]),
      "\n"
    );
    return this;
  }

  public error<T>(arg: T | T[] | any[]) {
    this.log(arg, LogType.ERROR);
    return this;
  }

  public debug<T>(arg: T | T[] | any[]) {
    this.log(arg, LogType.DEBUG);
    return this;
  }

  public info<T>(arg: T | T[] | any[]) {
    this.log(arg, LogType.INFO);
    return this;
  }

  public warn<T>(arg: T | T[] | any[]) {
    this.log(arg, LogType.WARN);
    return this;
  }
}

const leucine = new Leucine();
export default leucine;

export const configure: (config: LeucineConfiguration) => Leucine =
  leucine.configure.bind(leucine);
export const setDisplayDate: (bool: boolean) => Leucine =
  leucine.setDisplayDate.bind(leucine);
export const setDateFormat: (type: DateFormat) => Leucine =
  leucine.setDateFormat.bind(leucine);
export const setDisplayTime: (bool: boolean) => Leucine =
  leucine.setDisplayTime.bind(leucine);
export const setShowMilliseconds: (bool: boolean) => Leucine =
  leucine.setShowMilliseconds.bind(leucine);
export const setColor: (type: LogType, color: Colors) => Leucine =
  leucine.setColor.bind(leucine);
export const setDisplayArgTypes: (bool: boolean) => Leucine =
  leucine.setDisplayArgTypes.bind(leucine);
export const log: <T>(arg: T | T[] | any[], level?: LogType) => Leucine =
  leucine.log.bind(leucine);
export const error: <T>(arg: T | T[] | any[]) => Leucine =
  leucine.error.bind(leucine);
export const debug: <T>(arg: T | T[] | any[]) => Leucine =
  leucine.debug.bind(leucine);
export const info: <T>(arg: T | T[] | any[]) => Leucine =
  leucine.info.bind(leucine);
export const warn: <T>(arg: T | T[] | any) => Leucine =
  leucine.warn.bind(leucine);
