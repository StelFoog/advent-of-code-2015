import { input } from '../src/inputManager';

let x = 0;
let y = 0;
const houses = new Set<string>([locString()]);
for (const char of input) {
	switch (char) {
		case '^':
			y++;
			break;
		case 'v':
			y--;
			break;
		case '<':
			x--;
			break;
		case '>':
			x++;
			break;
	}
	houses.add(locString());
}

console.log(houses.size);

function locString() {
	return `${x}_${y}`;
}
