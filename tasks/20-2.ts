import { input } from "../src/inputManager";

const target = Number(input);

let i = 1;
const houses: Record<number, number> = {};
for (; true; i++) {
	for (let j = 1; j <= 50; j++) houses[i * j] = (houses[i * j] ?? 0) + i * 11;
	if (houses[i] >= target) break;
	delete houses[i];
}
console.log(i);
