import { input } from '../src/inputManager';

let floor = 0;
let i = 0;
for (; i < input.length; i++) {
	const char = input[i];
	if (char === '(') floor++;
	else floor--;
	if (floor === -1) break;
}

console.log(i + 1);
