import { input } from "../src/inputManager";

const hasher = new Bun.CryptoHasher("md5");

let i = 1;
for (; true; i++) {
	if (hasher.update(`${input}${i}`).digest("hex").startsWith("000000")) break;
}

console.log(i);
