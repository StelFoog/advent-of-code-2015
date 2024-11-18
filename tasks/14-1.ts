import { input } from "../src/inputManager";

const MAX_TIME = 2503;

const raindeer = input.split("\n").map((line) => {
	const splt = line.split(" ");
	return { name: splt[0], speed: Number(splt[3]), energy: Number(splt[6]), rest: Number(splt[13]) };
});

let max = 0;
for (const r of raindeer) {
	let time = 0;
	let dist = 0;
	let act: "travel" | "rest" = "travel";
	while (time < MAX_TIME) {
		if (act === "travel") {
			const used = r.energy <= MAX_TIME - time ? r.energy : MAX_TIME - time;
			dist += r.speed * used;
			time += used;
			act = "rest";
		} else {
			time += r.rest;
			act = "travel";
		}
	}
	if (dist > max) max = dist;
}

console.log(max);
