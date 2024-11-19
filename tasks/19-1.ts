import { input } from "../src/inputManager";

const replacements: Record<string, string[]> = {};
const molSet = new Set<string>();
const [lines, start] = input.split("\n\n");
for (const line of lines.split("\n")) {
	const [original, replacement] = line.split(" => ");
	molSet.add(original);
	if (!replacements[original]) replacements[original] = [];
	replacements[original].push(replacement);
}

const molecules = new Set<string>();
for (let i = 0; i < start.length; i++) {
	for (const mol of findReplacements(i)) {
		for (const rep of replacements[mol]) {
			molecules.add(start.slice(0, i) + rep + start.slice(i + mol.length));
		}
	}
}

console.log(molecules.size);

function findReplacements(idx: number) {
	let results: string[] = [];
	for (const mol of molSet) if (start.slice(idx).startsWith(mol)) results.push(mol);
	return results;
}
