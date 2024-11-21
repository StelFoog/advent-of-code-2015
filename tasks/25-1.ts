import { input } from "../src/inputManager";

const target = input
	.split(/[^\d+]/)
	.filter(Boolean)
	.map(Number);

let prev = 20151125;
for (let i = 2; true; i++) {
	for (let j = 0; j < i; j++) {
		let row = i - j;
		let col = j + 1;
		prev = (prev * 252533) % 33554393;
		if (row === target[0] && col === target[1]) {
			console.log(prev);
			process.exit(0);
		}
	}
}
