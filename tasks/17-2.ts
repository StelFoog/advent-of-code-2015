import { input } from "../src/inputManager";

const volume = 150;

const combinations = select(input.split("\n").map(Number));
let min = Number.MAX_SAFE_INTEGER;
for (const combi of combinations) if (combi.length < min) min = combi.length;

console.log(combinations.filter((c) => c.length === min).length);

function select(containers: number[], mem: number[] = []): number[][] {
	const filled = mem.reduce((p, c) => p + c, 0);
	if (filled > volume) return [];
	if (filled === volume) return [mem];

	let result = [];
	for (let skip = 0; skip < containers.length; skip++) {
		result.push(...select(containers.slice(skip + 1), [...mem, containers[skip]]));
	}
	return result;
}
