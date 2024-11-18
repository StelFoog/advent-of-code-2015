import { input } from "../src/inputManager";

const rules: Record<string, (v: number) => boolean> = {
	children: (v: number) => v === 3,
	cats: (v: number) => v > 7,
	samoyeds: (v: number) => v === 2,
	pomeranians: (v: number) => v < 3,
	akitas: (v: number) => v === 0,
	vizslas: (v: number) => v === 0,
	goldfish: (v: number) => v < 5,
	trees: (v: number) => v > 3,
	cars: (v: number) => v === 2,
	perfumes: (v: number) => v === 1,
};

for (const line of input.split("\n")) {
	const [name, ...props] = line.split(/((?<=\d): |, )/).filter((v) => !v.match(/^[:,]/));
	let valid = true;
	for (const prop of props) {
		const [p, n] = prop.split(": ");
		if (!rules[p](Number(n))) valid = false;
	}
	if (valid) console.log(Number(name.split(" ")[1]));
}
