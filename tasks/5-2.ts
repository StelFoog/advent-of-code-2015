import { input } from "../src/inputManager";

let nice = 0;
for (const line of input.split("\n")) {
	let splitChar = false;
	let doubleChar = false;
	for (let i = 2; i < line.length; i++) {
		if (line.slice(i).includes(line.slice(i - 2, i))) doubleChar = true;
		if (line[i - 2] === line[i]) splitChar = true;
	}
	if (splitChar && doubleChar) nice++;
}

console.log(nice);
