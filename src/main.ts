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

const A = {count : 0};
const B = {count : 0};
const C = {count : 0};

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

const upgradeButtons = (name: string, cost: number, growthRate: number, purchaseCount: {count: number}) => {
  const upgrade = document.createElement("button");
  upgrade.textContent = `${name} (COST: ${cost} Pineapples)`;
  upgrade.disabled = true;
  upgrade.style.color = "grey";

  upgrade.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost;
      growth += growthRate;
      purchaseCount.count++;
      updateCount();
      upgradeButtonVisible();
    }
  });

  app.append(upgrade);
  return upgrade;
};

const upgradeA = upgradeButtons("0.1/s Growth", 10, 0.1, A);
const upgradeB = upgradeButtons("2/s Growth", 100, 2, B);
const upgradeC = upgradeButtons("50/s Growth", 1000, 50, C);


const upgradeButtonVisible = () => {
  if (counter >= 10) {
    upgradeA.disabled = false;
    upgradeA.style.color = "white";
  } else {
    upgradeA.disabled = true;
    upgradeA.style.color = "grey";
  }
  if (counter >= 100) {
    upgradeB.disabled = false;
    upgradeB.style.color = "white";
  } else {
    upgradeB.disabled = true;
    upgradeB.style.color = "grey";
  }
  if (counter >= 1000) {
    upgradeC.disabled = false;
    upgradeC.style.color = "white";
  } else {
    upgradeC.disabled = true;
    upgradeC.style.color = "grey";
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
