import { input } from "../src/inputManager";

const START = "e";

const replacements: Record<string, string[]> = {};
const molSet = new Set<string>();
const [lines, target] = input.split("\n\n");
for (const line of lines.split("\n")) {
	const [original, replacement] = line.split(" => ");
	molSet.add(replacement);
	if (!replacements[replacement]) replacements[replacement] = [];
	replacements[replacement].push(original);
}

let queue = [{ v: target, s: 0 }];
const prev = new Set<string>([target]);
let curr: (typeof queue)[number];
while (queue.length) {
	curr = queue.shift()!;
	if (curr.v === START) break;

	for (let i = 0; i < curr.v.length; i++) {
		const reps = findReplacements(curr.v, i).filter((v) => !prev.has(v));
		reps.forEach((v) => {
			prev.add(v);
			queueItem({ v, s: curr.s + 1 });
		});
	}
}

console.log(curr!.s);

function queueItem(item: (typeof queue)[number]) {
	let i = 0;
	for (; i < queue.length; i++) {
		if (queue[i].v.length > item.v.length) break;
	}
	queue = [...queue.slice(0, i), item, ...queue.slice(i)];
}

function findReplacements(str: string, idx: number) {
	let results: string[] = [];
	for (const mol of molSet)
		if (str.slice(idx).startsWith(mol))
			for (const rep of replacements[mol])
				results.push(str.slice(0, idx) + rep + str.slice(idx + mol.length));

	return results;
}
