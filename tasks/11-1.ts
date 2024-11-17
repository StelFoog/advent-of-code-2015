import { input } from "../src/inputManager";

const aCode = "a".charCodeAt(0);
const zCode = "z".charCodeAt(0);

let password = input;

while (!isValid()) {
	const codes = Array.from({ length: password.length }).map((_, idx) => password.charCodeAt(idx));
	codes[codes.length - 1]++;
	let i = codes.length - 1;
	for (; i >= 0 && codes[i] > zCode; i--) {
		codes[i - 1]++;
		codes[i] = aCode;
	}
	password = i < 0 ? "a" : "";
	codes.forEach((c) => (password += String.fromCharCode(c)));
}

console.log(password);

function isValid() {
	let stair = false;
	let doubles = 0;
	let prevDouble = false;
	for (let i = 1; i < password.length; i++) {
		const curr = password[i];
		if (["i", "o", "l"].includes(curr)) return false;

		if (
			password.charCodeAt(i - 2) + 1 === password.charCodeAt(i - 1) &&
			password.charCodeAt(i - 1) + 1 === password.charCodeAt(i)
		)
			stair = true;

		if (!prevDouble && password[i - 1] === password[i]) {
			doubles++;
			prevDouble = true;
		} else {
			prevDouble = false;
		}
	}

	return stair && doubles > 1;
}
