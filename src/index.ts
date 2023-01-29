type Levels = "debug" | "info" | "warn" | "error";

const levelIndicators: { [T in Levels]: string } = {
	debug: `🐛 `,
	info: `ℹ️  `,
	warn: `⚠️  `,
	error: `⛔️ `,
};

const levelBackgroundColors: { [T in Levels]: string[] } = {
	debug: ["\x1b[48;5;240m", "darkgray"],
	info: ["\x1b[48;5;18m", "cornflowerblue"],
	warn: ["\x1b[48;5;208m", "darkorange"],
	error: ["\x1b[48;5;88m", "darkred"],
};

export const log = <T>(arg: T, level: Levels = "debug") => {
	// @ts-ignore
	if (typeof window === "undefined") {
		console.log(
			`\x1b[1m${levelBackgroundColors[level][0]}${
				levelIndicators[level]
			}(${level}) in ${import.meta.file ?? import.meta.url}\x1b[0m\n\n`,
			arg,
			"\n",
		);
	} else {
		console.log(
			`%c${levelIndicators[level]}(${level})\n\n`,
			`color:white;background-color:${levelBackgroundColors[level][1]};`,
			arg,
			"\n\n",
		);
	}
};
