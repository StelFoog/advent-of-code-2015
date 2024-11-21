import { input } from "../src/inputManager";

type Instruction =
	| { c: "hlf" | "tpl" | "inc"; r: "a" | "b" }
	| { c: "jmp"; offset: number }
	| { c: "jie" | "jio"; r: "a" | "b"; offset: number };

const instructions = input.split("\n").map<Instruction>((line) => {
	if (/^(hlf|tpl|inc)/.exec(line))
		return { c: line.split(" ")[0], r: line.split(" ")[1] } as Instruction;
	if (line.startsWith("jmp"))
		return { c: line.split(" ")[0] as "jmp", offset: Number(line.split(" ")[1]) };
	const jiMatch = /(jie|jio) (a|b), ([+-]\d+)/.exec(line);
	if (!jiMatch) throw new Error("No matching instruction for line: " + line);

	return { c: jiMatch[1], r: jiMatch[2], offset: Number(jiMatch[3]) } as Instruction;
});

const regs = { a: 0, b: 0 };

// console.log(instructions.length);
for (let i = 0; i >= 0 && i < instructions.length; i++) {
	// Bun.sleepSync(500);
	const inst = instructions[i];
	// console.log({ i, inst, regs });
	switch (inst.c) {
		case "hlf":
			regs[inst.r] = Math.floor(regs[inst.r] / 2);
			break;
		case "tpl":
			regs[inst.r] *= 3;
			break;
		case "inc":
			regs[inst.r]++;
			break;
		case "jmp":
			i += inst.offset - 1;
			break;
		case "jie":
			if (regs[inst.r] % 2 === 0) i += inst.offset - 1;
			break;
		case "jio":
			if (regs[inst.r] === 1) i += inst.offset - 1;
			break;
	}
}

console.log(regs.b);
