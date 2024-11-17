import { input } from "../src/inputManager";

let nice = 0;
for (const line of input.split("\n")) {
	if (line.match(/(ab|cd|pq|xy)/)) continue;
	let vowels = line[0].match(/[aeiou]/) ? 1 : 0;
	let repeatChar = false;
	for (let i = 1; i < line.length; i++) {
		if (line[i].match(/[aeiou]/)) vowels++;
		if (line[i - 1] === line[i]) repeatChar = true;
	}
	if (vowels >= 3 && repeatChar) nice++;
}

console.log(nice);
