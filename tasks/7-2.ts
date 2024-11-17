import { input } from "../src/inputManager";

type Op =
	| ["SET" | "NOT", string, string]
	| ["AND" | "OR" | "LSHIFT" | "RSHIFT", string, string, string];

let wires: Record<string, number> = {};

exec();
const a = wires.a;
wires = { b: a };
exec();
console.log(wires.a);

function exec() {
	const queue: Op[] = [];
	for (const line of input.split("\n")) queue.push(getOp(line));

	while (queue.length) {
		const op = queue.shift()!;
		if (!allSet(op)) {
			queue.push(op);
			continue;
		}
		execOP(op);
	}
}

function execOP(op: Op) {
	if (typeof wires[op[op.length - 1]] === "number") return;
	switch (op[0]) {
		case "SET":
			wires[op[2]] = ev(op[1])!;
			break;
		case "NOT":
			wires[op[2]] = ~ev(op[1])! & 0xffff;
			break;
		case "AND":
			wires[op[3]] = ev(op[1])! & ev(op[2])!;
			break;
		case "OR":
			wires[op[3]] = ev(op[1])! | ev(op[2])!;
			break;
		case "LSHIFT":
			wires[op[3]] = (ev(op[1])! << ev(op[2])!) & 0xffff;
			break;
		case "RSHIFT":
			wires[op[3]] = (ev(op[1])! >> ev(op[2])!) & 0xffff;
			break;
	}
}

function getOp(line: string): Op {
	const setMatch = /^(\w+) -> (\w+)/.exec(line);
	if (setMatch) return ["SET", setMatch[1], setMatch[2]];
	const aoshiMatch = /^(\w+) (AND|OR|LSHIFT|RSHIFT) (\w+) -> (\w+)/.exec(line);
	if (aoshiMatch) return [aoshiMatch[2] as "AND", aoshiMatch[1], aoshiMatch[3], aoshiMatch[4]];
	const notMatch = /^NOT (\w+) -> (\w+)/.exec(line);
	if (notMatch) return ["NOT", notMatch[1], notMatch[2]];

	throw new Error(`Failed line parsing: ${line}`);
}

function ev(param: string): number | null {
	const num = Number(param);
	return Number.isInteger(num) ? num : (wires[param] ?? null);
}

function allSet(op: Op) {
	const params = op.slice(1, -1);
	return params.every((param) => ev(param) !== null);
}
