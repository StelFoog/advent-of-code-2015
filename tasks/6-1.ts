import { input } from "../src/inputManager";

const lineRegex = /(turn on|toggle|turn off) (\d+,\d+) through (\d+,\d+)/;

const lights = Array.from({ length: 1000 }).map(() =>
	Array.from({ length: 1000 }).map(() => false)
);
for (const line of input.split("\n")) {
	const [_, act, start, end] = lineRegex.exec(line)!;

	const [startX, startY] = start.split(",").map(Number);
	const [endX, endY] = end.split(",").map(Number);
	for (let x = startX; x <= endX; x++) {
		for (let y = startY; y <= endY; y++) {
			if (act === "turn on") lights[x][y] = true;
			else if (act === "turn off") lights[x][y] = false;
			else lights[x][y] = !lights[x][y];
		}
	}
}

let on = 0;
for (const row of lights) for (const light of row) if (light) on++;

console.log(on);
