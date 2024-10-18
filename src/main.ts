import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pineapple";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const count = document.createElement("div");
let counter: number = 0;
let growth: number = 0;

const A = { count: 0 };
const B = { count: 0 };
const C = { count: 0 };

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const allUpgrades: Item[] = [
  { name: "Pineapple Farm", cost: 10, rate: 0.1, description: "A basic pineapple farm"},
  { name: "Pineapple Plantation", cost: 100, rate: 2, description: "Delivers the most exquisite pineapples" },
  { name: "Pineapple Factory", cost: 1000, rate: 50, description: "Manufactoring pineapples since '01" },
  { name: "Pineapple Island", cost: 5000, rate: 250, description: "Where all pineapples grow in peace" },
  { name: "Pineapple Heaven", cost: 30000, rate: 1000, description: "Godlike pineapple growth" }
];

const purchaseCount: { [key: string]: number } = {
  "Pineapple Farm": 0,
  "Pineapple Plantation": 0,
  "Pineapple Factory": 0,
  "Pineapple Island": 0,
  "Pineapple Heaven": 0
};

const growthInc = 1.15;

const growthAmount = document.createElement("div");
const purchaseAmount = document.createElement("div");

const updateCount = () => {
  count.textContent = `${Math.floor(counter)} pineapples stolen`;
  growthAmount.textContent = `Current Growth Rate: ${Number(growth.toPrecision(2))} p/sec`;
  purchaseAmount.textContent = `Purchased: A = ${A.count}, B = ${B.count}, C = ${C.count}`;
};

updateCount();
app.append(count);
app.append(growthAmount);
app.append(purchaseAmount);

const button = document.createElement("button");
button.textContent = "🍍";
button.addEventListener("click", () => {
  counter++;
  updateCount();
  upgradeButtonVisible();
});
app.appendChild(button);

const upgradeButtons: HTMLButtonElement[] = [];

allUpgrades.forEach((item) => {
  const upgrade = document.createElement("button");
  upgrade.textContent = `${item.name} (COST: ${Number(item.cost.toPrecision(2))} Pineapples)`;
  upgrade.title = item.description;
  upgrade.disabled = true;
  upgrade.style.color = "grey";

  upgrade.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growth += item.rate;
      purchaseCount[item.name]++;
      item.cost *= growthInc;
      upgrade.textContent = `${item.name} (COST: ${item.cost.toFixed(2)} Pineapples)`;
      upgrade.title = item.description;
      updateCount();
      upgradeButtonVisible();
    }
  });

  app.append(upgrade);
  upgradeButtons.push(upgrade);
});

const upgradeButtonVisible = () => {
  for (let i = 0; i < allUpgrades.length; i++) {
    if (counter >= allUpgrades[i].cost) {
      upgradeButtons[i].disabled = false;
      upgradeButtons[i].style.color = "white";
    } else {
      upgradeButtons[i].disabled = true;
      upgradeButtons[i].style.color = "grey";
    }
  }
};

let zero = performance.now();

const updateCounter = (curr: number) => {
  counter += ((curr - zero) / 1000) * growth;
  updateCount();
  upgradeButtonVisible();
  zero = curr;
  requestAnimationFrame(updateCounter);
};
requestAnimationFrame(updateCounter);
