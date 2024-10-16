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

const updateCount = () => {
  count.textContent = `${Math.floor(counter)} pineapples stolen`;
};

updateCount();
app.append(count);

const button = document.createElement("button");
button.textContent = "🍍";
button.addEventListener("click", () => {
  counter++;
  updateCount();
  upgradeButtonVisible();
});
app.appendChild(button);

const upgrades = document.createElement("button");
upgrades.textContent = "Increase Growth (COST: 10 Pineapples)";
upgrades.disabled = true;
upgrades.style.color = "grey";

const upgradeButtonVisible = () => {
  if (counter >= 10) {
    upgrades.disabled = false;
    upgrades.style.color = "white";
  }
  else {
    upgrades.disabled = true;
    upgrades.style.color = "grey";
  }
}

upgrades.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growth += 1;
    updateCount();
    upgradeButtonVisible();
  }
});

app.append(upgrades);

let zero = performance.now();

const updateCounter = (curr: number) => {
  counter += ((curr - zero) / 1000) * growth;
  updateCount();
  upgradeButtonVisible();
  zero = curr;
  requestAnimationFrame(updateCounter);
};
requestAnimationFrame(updateCounter);
