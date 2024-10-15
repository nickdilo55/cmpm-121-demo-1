import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pineapple";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.addEventListener("click", () => {
    alert("P I N E A P P L E");
});

app.appendChild(button);
