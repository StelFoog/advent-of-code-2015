import { input } from '../src/inputManager';

let floor = 0;
for (const char of input) {
	if (char === '(') floor++;
	else floor--;
}

console.log(floor);
