import { input } from '../src/inputManager';

let sum = 0;
for (const line of input.split('\n')) {
	const [l, w, h] = line.split('x').map(Number);
	const sides = [2 * l * w, 2 * w * h, 2 * h * l];
	sum += sides[0] + sides[1] + sides[2] + Math.min(...sides) / 2;
}

console.log(sum);
