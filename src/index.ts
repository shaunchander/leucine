export const enum LogType {
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error",
}

export const enum Colors {
	BG_DARK_GRAY = "\x1b[48;5;240m",
	BG_CORN_FLOWER_BLUE = "\x1b[48;5;18m",
	BG_DARK_ORANGE = "\x1b[48;5;208m",
	BG_DARK_RED = "\x1b[48;5;88m",
	BLACK = "\x1b[30m",
	RED = "\x1b[31m",
	GREEN = "\x1b[32m",
	YELLOW = "\x1b[33m",
	BLUE = "\x1b[34m",
	MAGENTA = "\x1b[35m",
	CYAN = "\x1b[36m",
	WHITE = "\x1b[37m",
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
	private debugColor = Colors.BG_DARK_GRAY;
	private infoColor = Colors.BG_CORN_FLOWER_BLUE;
	private warnColor = Colors.BG_DARK_ORANGE;
	private errorColor = Colors.BG_DARK_RED;

	private displayDate = true;
	private dateFormat = DateFormat.MONTH_DAY_YEAR;
	private displayTime = true;
	private showMilliseconds = false;
	private displayArgTypes = false;

	constructor(config?: LeucineConfiguration) {
		if (config) {
			this.configure(config);
		}
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

	private log<T>(arg: T | T[], level: LogType = LogType.DEBUG) {
		const backgroundColor = this[`${level}Color`];
		const indicator = levelIndicators[level];

		const fileName = import.meta.file ?? import.meta.url;

		const inDate = this.displayDate || this.displayTime ? new Date() : null;
		const date = this.displayDate
			? `${this.getDateStringified(inDate as Date)}`
			: "";
		const time = this.displayTime
			? ` ${this.getTimeStringified(inDate as Date)}`
			: "";

		const argTypes = this.displayArgTypes
			? `| ${
					Array.isArray(arg)
						? `[${arg.map((x) => (typeof x).toString()).join(", ")}]`
						: (typeof arg).toString()
			  }`
			: "";

		console.log(
			`\x1b[1m${backgroundColor}${indicator}[${date}${time}] (${level}) in ${fileName}\x1b[0m\n\n`,
			...(Array.isArray(arg) ? [...arg] : [arg]),
			argTypes,
			"\n"
		);
		return this;
	}

	public error<T>(arg: T | T[]) {
		this.log(arg, LogType.ERROR);
		return this;
	}

	public debug<T>(arg: T | T[]) {
		this.log(arg, LogType.DEBUG);
		return this;
	}

	public info<T>(arg: T | T[]) {
		this.log(arg, LogType.INFO);
		return this;
	}

	public warn<T>(arg: T | T[]) {
		this.log(arg, LogType.WARN);
		return this;
	}
}
const leucine = new Leucine();

export const configure: (config: LeucineConfiguration) => void =
	leucine.configure.bind(leucine);

export const error: <T>(arg: T | T[]) => Leucine = leucine.error.bind(leucine);
export const debug: <T>(arg: T | T[]) => Leucine = leucine.debug.bind(leucine);
export const info: <T>(arg: T | T[]) => Leucine = leucine.info.bind(leucine);
export const warn: <T>(arg: T | T[]) => Leucine = leucine.warn.bind(leucine);

export default Leucine;
