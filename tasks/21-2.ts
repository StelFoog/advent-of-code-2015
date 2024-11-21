// Add item cost table to input file after actual input, separate by one blank line. Example:
// Hit Points: 12
// Damage: 7
// Armor: 2
//
// Weapons:    Cost  Damage  Armor
// ...

import elf from "elf-help";
import { input } from "../src/inputManager";

type Item = { name: string; cost: number; damage: number; armor: number };
type Character = { hp: number; damage: number; armor: number };

const [bossDef, ...restDef] = input.split("\n\n");

const [hp, dmg, amr] = bossDef.split("\n");
const boss: Character = { hp: getNum(hp), damage: getNum(dmg), armor: getNum(amr) };

const [weapons, armor, rings] = restDef.map<Item[]>((def) => {
	const parse = def.split("\n").slice(1);
	return parse.map((line) => {
		const [name, c, d, a] = line.split(/\s{2,}/);
		return { name, cost: Number(c), damage: Number(d), armor: Number(a) };
	});
});

const combinations: { cost: number; items: Item[] }[] = [];
const ringOpts = [[], ...elf.combinations(rings, 1), ...elf.combinations(rings, 2)];
weapons.forEach((weapon) => {
	[null, ...armor].forEach((armor) => {
		ringOpts.forEach((rings) => {
			const items = [weapon, ...(armor ? [armor] : []), ...rings];
			combinations.push({ cost: items.reduce((p, c) => p + c.cost, 0), items });
		});
	});
});

for (const combo of combinations.toSorted((a, b) => b.cost - a.cost)) {
	const p = {
		hp: 100,
		damage: combo.items.reduce((p, c) => p + c.damage, 0),
		armor: combo.items.reduce((p, c) => p + c.armor, 0),
	};
	if (!wouldWin(p, boss)) {
		console.log(combo.cost);
		process.exit(0);
	}
}

function wouldWin(a: Character, b: Character) {
	let [aHp, bHp] = [a.hp, b.hp];
	let [aDpt, bDpt] = [Math.max(a.damage - b.armor, 1), Math.max(b.damage - a.armor, 1)];
	while (aHp > 0) {
		bHp -= aDpt;
		if (bHp <= 0) break;
		aHp -= bDpt;
	}
	return aHp > 0;
}

function getNum(str: string) {
	return Number(str.split(": ")[1]);
}
