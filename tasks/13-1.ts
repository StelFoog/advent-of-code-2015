import elf from "elf-help";
import { input } from "../src/inputManager";

const feelings: Record<string, Record<string, number>> = {};
const names = new Set<string>();

for (const line of input.split("\n")) {
	const splt = line.split(" ");
	names.add(splt[0]);
	if (!feelings[splt[0]]) feelings[splt[0]] = {};
	feelings[splt[0]][splt[10].slice(0, -1)] = Number(splt[3]) * (splt[2] === "gain" ? 1 : -1);
}

let max = Number.MIN_SAFE_INTEGER;
for (const people of elf.permutations(Array.from(names))) {
	let cur =
		feelings[people[0]][people[people.length - 1]] + feelings[people[people.length - 1]][people[0]];
	for (let i = 0; i < people.length - 1; i++) {
		cur += feelings[people[i]][people[i + 1]] + feelings[people[i + 1]][people[i]];
	}
	if (cur > max) max = cur;
}

console.log(max);
