const enum LogType {
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error",
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
	const backgroundColor = levelBackgroundColors[level];
	const indicator = levelIndicators[level];

	const fileName = import.meta.file ?? import.meta.url;
	// @ts-ignore
	if (typeof window === "undefined") {
		console.log(
			`\x1b[1m${backgroundColor[0]}${indicator} (${level}) in ${fileName}\x1b[0m\n\n`,
			arg,
			"\n",
		);
	} else {
		console.log(
			`%c${indicator} (${level})\n\n`,
			`color:white;background-color:${backgroundColor[1]};`,
			arg,
			"\n\n",
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
