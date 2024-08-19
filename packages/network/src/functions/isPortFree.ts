import { createConnection } from "node:net";

//----------------------
// Errors
//----------------------

// const MyErrorList: TMyErrorList = {
// 	CANT_CHECK: {
// 		code: "CANT_CHECK_SYSTEM_TYPE",
// 		hint: {},
// 		message: { dev: "platform() from node return error", user: "Please try again." },
// 		name: "System Check Error"
// 	}
// } as const;

//----------------------
// Functions
//----------------------

/**
 *
 * Port Checker
 *
 * @param host - address to check
 * @param port
 * @param timeout
 *
 * @example console.log(isPortFree("localhost", 8080))
 * @returns {TSystem|string} current system type.
 */

export const isPortFree = (host: string, port: number, timeout = 1000) => {
	return new Promise(resolve => {
		const socket = createConnection({ host, port, timeout }, () => {
			socket.end();
			resolve(true); // Port jest otwarty
		});

		socket.on("error", () => {
			resolve(false);
		});

		socket.on("timeout", () => {
			socket.destroy();
			resolve(false);
		});
	});
};

export default isPortFree;
