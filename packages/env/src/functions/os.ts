import { platform } from "node:os";
import { MyError, myErrorWrapper } from "oh-my-error";
import type { TMyErrorList } from "oh-my-error";

//----------------------
// Types
//----------------------

type TSystem =
	| "aix"
	| "android"
	| "cygwin"
	| "freebsd"
	| "haiku"
	| "linux"
	| "mac"
	| "netbsd"
	| "openbsd"
	| "other"
	| "sunos"
	| "windows";

//----------------------
// Errors
//----------------------

const MyErrorList: TMyErrorList = {
	CANT_CHECK: {
		code: "CANT_CHECK_SYSTEM_TYPE",
		hint: {},
		message: { dev: "platform() from node return error", user: "Please try again." },
		name: "System Check Error"
	}
} as const;

//----------------------
// Functions
//----------------------

/**
 *
 * Return System Type
 *
 * @example console.log(os())
 * @returns {TSystem|string} current system type.
 * @throws MyError
 */

export const os = (): TSystem => {
	const [system, isError] = myErrorWrapper(platform)();

	if (isError) throw new MyError(MyErrorList.CANT_CHECK);

	const systemList = {
		aix: "aix",
		android: "android",
		cygwin: "cygwin",
		darwin: "mac",
		freebsd: "freebsd",
		haiku: "haiku",
		linux: "linux",
		netbsd: "netbsd",
		openbsd: "openbsd",
		sunos: "sunos",
		win32: "windows"
	} as const satisfies Record<string, TSystem>;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return systemList[system] || "other"; // Currently always true, but in future?
};

export default os;
