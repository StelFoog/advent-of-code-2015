import { input } from "../src/inputManager";
import elf from "elf-help";

const distances: Record<string, Record<string, number>> = {};
const cities = new Set<string>();

for (let line of input.split("\n")) {
	const [_, c1, c2, dis] = /(\w+) to (\w+) = (\d+)/.exec(line)!;
	cities.add(c1);
	cities.add(c2);
	if (!distances[c1]) distances[c1] = {};
	if (!distances[c2]) distances[c2] = {};
	distances[c1][c2] = Number(dis);
	distances[c2][c1] = Number(dis);
}

let max = 0;
for (const places of elf.permutations(Array.from(cities))) {
	let dist = 0;
	for (let i = 1; i < places.length; i++) dist += distances[places[i]][places[i - 1]];
	if (dist > max) max = dist;
}

console.log(max);
