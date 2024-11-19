import elf from "elf-help";
import { input } from "../src/inputManager";

const target = Number(input);

let i = 1;
for (; true; i++) {
	const divisors = elf.divisors(i);
	if (divisors.reduce((prev, curr) => prev + curr, 0) * 10 >= target) break;
}
console.log(i);
