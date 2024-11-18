import { input } from "../src/inputManager";

let lights = input.split("\n").map((line) => line.split("").map((c) => c === "#"));
for (const x of [0, lights.length - 1]) for (const y of [0, lights.length - 1]) lights[x][y] = true;

let newLights: typeof lights;
let sum: number;
for (let step = 0; step < 100; step++) {
	sum = 0;
	newLights = lights.map(() => []);
	for (let i = 0; i < lights.length; i++) {
		for (let j = 0; j < lights[i].length; j++) {
			const surrounding = surroundingLights(i, j);
			newLights[i][j] = (lights[i][j] && surrounding === 2) || surrounding === 3;
			if (newLights[i][j]) sum++;
		}
	}
	lights = newLights;
}
console.log(sum!);

function surroundingLights(x: number, y: number) {
	if ([0, lights.length - 1].includes(x) && [0, lights.length - 1].includes(y)) return 3;
	let sum = 0;
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) if ((i || j) && lights[x + i]?.[y + j]) sum++;
	}
	return sum;
}
