import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pineapple";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const count = document.createElement("div");
let counter: number = 0;

const updateCount = () => {
  count.textContent = `${counter} pineapples eaten`;
};

updateCount();
app.append(count);

const button = document.createElement("button");
button.textContent = "🍍";
button.addEventListener("click", () => {
  counter++;
  updateCount();
});
app.appendChild(button);

setInterval(() => {
    counter++;
    updateCount();
}, 1000);
