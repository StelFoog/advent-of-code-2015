import { input } from "../src/inputManager";

let total = 0;
for (const line of input.split("\n")) {
	let len = 0;
	let escaped = false;
	for (let i = 1; i < line.length - 1; i++) {
		const curr = line[i];
		if (escaped) {
			if (curr === "\\" || curr === '"') {
				escaped = false;
				len++;
			} else if (curr === "x") {
				escaped = false;
				len++;
				i += 2;
			} else {
				throw new Error(
					`Previous character escaped but invalid escape target: ${curr}\n${line}:${i}`
				);
			}
		} else if (curr === "\\") {
			escaped = true;
		} else {
			len++;
		}
	}
	total += line.length - len;
}

console.log(total);
