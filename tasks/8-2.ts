import { input } from "../src/inputManager";

let total = 0;
for (const line of input.split("\n")) {
	let len = 0;
	for (let i = 0; i < line.length; i++) {
		if (line[i] === "\\" || line[i] === '"') len++;
		len++;
	}
	total += len + 2 - line.length;
}

console.log(total);
