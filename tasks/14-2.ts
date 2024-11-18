import { input } from "../src/inputManager";

const MAX_TIME = 2503;

const raindeer = input.split("\n").map((line) => {
	const splt = line.split(" ");
	return {
		name: splt[0],
		speed: Number(splt[3]),
		energy: Number(splt[6]),
		rest: Number(splt[13]),
		dist: 0,
		points: 0,
		act: "travel" as "travel" | "rest",
		for: Number(splt[6]),
	};
});

for (let i = 0; i < MAX_TIME; i++) {
	let maxDist = 0;
	for (const r of raindeer) {
		if (r.act === "travel") r.dist += r.speed;
		r.for--;
		if (r.for === 0) {
			r.act = r.act === "rest" ? "travel" : "rest";
			r.for = r.act === "rest" ? r.rest : r.energy;
		}
		if (r.dist > maxDist) maxDist = r.dist;
	}

	for (const r of raindeer) {
		if (r.dist === maxDist) r.points++;
	}
}

let maxPoints = 0;
for (const r of raindeer) {
	if (r.points > maxPoints) maxPoints = r.points;
}
console.log(maxPoints);
