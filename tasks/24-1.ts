import elf from "elf-help";
import { input } from "../src/inputManager";

const packages = input.split("\n").map(Number);
const groupWeight = elf.sum(...packages) / 3;

for (let i = 1; i < packages.length / 3; i++) {
	const options = elf.combinations(packages, i).filter((opt) => elf.sum(...opt) === groupWeight);
	if (options.length) {
		console.log(Math.min(...options.map((opt) => elf.product(...opt))));
		break;
	}
}
