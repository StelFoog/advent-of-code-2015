import { input } from "../src/inputManager";

const rules = `children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`.split("\n");

for (const line of input.split("\n")) {
	const [name, ...props] = line.split(/((?<=\d): |, )/).filter((v) => !v.match(/^[:,]/));
	let valid = true;
	for (const prop of props) {
		if (!rules.includes(prop)) valid = false;
	}
	if (valid) console.log(Number(name.split(" ")[1]));
}
