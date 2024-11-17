import { input } from "../src/inputManager";

let x = [0, 0];
let y = [0, 0];
let flip = 0;
const houses = new Set<string>([locString()]);
for (const char of input) {
  switch (char) {
    case "^":
      y[flip]++;
      break;
    case "v":
      y[flip]--;
      break;
    case "<":
      x[flip]--;
      break;
    case ">":
      x[flip]++;
      break;
  }
  houses.add(locString());
  flip = flip ? 0 : 1;
}

console.log(houses.size);

function locString() {
  return `${x[flip]}_${y[flip]}`;
}
