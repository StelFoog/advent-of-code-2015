import { input } from "../src/inputManager";

const volume = 150;

console.log(select(input.split("\n").map(Number)));

function select(containers: number[], filled: number = 0): number {
	if (filled > volume) return 0;
	if (filled === volume) return 1;

	let total = 0;
	for (let skip = 0; skip < containers.length; skip++) {
		total += select(containers.slice(skip + 1), filled + containers[skip]);
	}
	return total;
}
