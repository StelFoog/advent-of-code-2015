import { input } from "../src/inputManager";

type Effect = { name: "Shield" | "Poison" | "Recharge"; turns: number };
type Move = { name: string; cost: number; damage: number; heal: number; effect: Effect | null };

const moves: Move[] = [
	{ name: "Magic Missile", cost: 53, damage: 4, heal: 0, effect: null },
	{ name: "Drain", cost: 73, damage: 2, heal: 2, effect: null },
	{ name: "Shield", cost: 113, damage: 0, heal: 0, effect: { name: "Shield", turns: 6 } },
	{ name: "Poison", cost: 173, damage: 0, heal: 0, effect: { name: "Poison", turns: 6 } },
	{ name: "Recharge", cost: 229, damage: 0, heal: 0, effect: { name: "Recharge", turns: 5 } },
];

type State = { pHp: number; bHp: number; mana: number; cost: number; effs: Effect[]; pt: boolean };

const [bHp, bDmg] = input.split("\n").map((v) => Number(/\d+/.exec(v)![0]));

const queue: State[] = [{ pHp: 50, bHp, mana: 500, cost: 0, effs: [], pt: true }];
let min = Number.MAX_SAFE_INTEGER;

while (queue.length) {
	const curr = queue.shift()!;
	if (curr.cost >= min) continue;
	let armor = 0;
	let mana = curr.mana;
	let pHp = curr.pHp;
	let bHp = curr.bHp;
	const effs: Effect[] = [];
	curr.effs.forEach((e) => {
		if (e.name === "Shield") armor = 7;
		if (e.name === "Poison") bHp -= 3;
		if (e.name === "Recharge") mana += 101;
		let turns = e.turns - 1;
		if (turns) effs.push({ ...e, turns });
	});

	if (bHp <= 0) {
		min = curr.cost;
		continue;
	}

	if (curr.pt) {
		for (const { cost, ...move } of moves) {
			if (mana >= cost && !effs.some((e) => e.name === move.effect?.name))
				queue.push({
					pHp: pHp + move.heal,
					bHp: bHp - move.damage,
					mana: mana - cost,
					cost: curr.cost + cost,
					effs: [...effs, ...(move.effect ? [move.effect] : [])],
					pt: false,
				});
		}
	} else {
		const dmg = Math.max(bDmg - armor, 1);
		if (dmg >= pHp) continue;
		queue.unshift({ pHp: pHp - dmg, bHp, mana, cost: curr.cost, effs, pt: true });
	}
}
console.log(min);
