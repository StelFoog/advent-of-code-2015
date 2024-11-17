import { input } from "../src/inputManager";

let seq = input;
for (let time = 0; time < 40; time++) {
	let nSeq = "";
	let mem = "";
	for (let i = 0; i < seq.length; i++) {
		const curr = seq[i];
		if (!mem) {
			mem += curr;
		} else if (mem[0] === curr) {
			mem += curr;
		} else {
			if (mem) nSeq += `${mem.length}${mem[0]}`;
			mem = curr;
		}
	}
	seq = nSeq + `${mem.length}${mem[0]}`;
}

console.log(seq.length);
