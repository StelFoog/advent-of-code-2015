import { input } from '../src/inputManager';

let sum = 0;
for (const line of input.split('\n')) {
	const dimentions = line
		.split('x')
		.map(Number)
		.toSorted((a, b) => a - b);
	sum += dimentions[0] * 2 + dimentions[1] * 2; // Ribbon
	sum += dimentions[0] * dimentions[1] * dimentions[2]; // Bow
}

console.log(sum);
