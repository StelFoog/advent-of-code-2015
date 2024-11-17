import { input } from "../src/inputManager";

const json = JSON.parse(input);

console.log(getNumberSum(json));

function getNumberSum(v: any): number {
	if (typeof v === "number") return v;
	if (typeof v === "string") return 0;

	const vals = Object.values(v);
	if (vals.includes("red") && !Array.isArray(v)) return 0;

	let sum = 0;
	for (const el of Object.values(v)) sum += getNumberSum(el);
	return sum;
}
