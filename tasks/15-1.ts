import { input } from "../src/inputManager";

const MAX_TEASPOONS = 100;

const ingredientPattern =
	/(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;

const ingredients = input.split("\n").map((line) => {
	const [_, name, ...rest] = ingredientPattern.exec(line)!;
	const [capacity, durability, flavor, texture, calories] = rest.map(Number);
	return { name, capacity, durability, flavor, texture, calories };
});

let maxValue = 0;
for (const opt of getOptions(ingredients.length)) {
	const val = cookieValue(opt);
	if (val > maxValue) maxValue = val;
}

console.log(maxValue);

function getOptions(len: number, mem: number[] = []): number[][] {
	const res: number[][] = [];
	const sum = mem.reduce((prev, curr) => prev + curr, 0);
	if (len === 1) return [[...mem, MAX_TEASPOONS - sum]];
	for (let i = 0; i + sum <= MAX_TEASPOONS; i++) res.push(...getOptions(len - 1, [...mem, i]));

	return res;
}

function cookieValue(amounts: number[]) {
	let cap = 0;
	let dur = 0;
	let fla = 0;
	let tex = 0;
	for (let i = 0; i < ingredients.length; i++) {
		cap += ingredients[i].capacity * amounts[i];
		dur += ingredients[i].durability * amounts[i];
		fla += ingredients[i].flavor * amounts[i];
		tex += ingredients[i].texture * amounts[i];
	}

	if (cap < 0 || dur < 0 || fla < 0 || tex < 0) return 0;
	return cap * dur * fla * tex;
}
