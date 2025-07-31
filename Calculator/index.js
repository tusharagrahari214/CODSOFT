
const displayCurrent = document.getElementById("displayCurrent");
const displayHistory = document.getElementById("displayHistory");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("themeToggle");

let currentOperand = "";
let previousOperand = "";
let operation = null;

function updateDisplay() {
    displayCurrent.textContent = currentOperand || "0";
    displayHistory.textContent = previousOperand + (operation ? " " + operation : "");
}

function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
}

function chooseOperation(op) {
    if (currentOperand === "") return;
    if (previousOperand !== "") compute();
    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
}

function compute() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case "+": result = prev + current; break;
        case "-": result = prev - current; break;
        case "*": result = prev * current; break;
        case "/": result = current !== 0 ? prev / current : "Error"; break;
        default: return;
    }
    currentOperand = result.toString();
    operation = null;
    previousOperand = "";
}

function clear() {
    currentOperand = "";
    previousOperand = "";
    operation = null;
}

function deleteLast() {
    currentOperand = currentOperand.slice(0, -1);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    document.documentElement.style.setProperty('--primary-color', isDark ? '#9b59b6' : '#3498db');
    document.documentElement.style.setProperty('--secondary-color', isDark ? '#8e44ad' : '#2980b9');
    document.documentElement.style.setProperty('--display-bg', isDark ? '#121212' : '#1a1a1a');
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const text = button.textContent;
        const op = button.dataset.operation;
        if (!isNaN(text) || text === ".") appendNumber(text);
        else if (op) chooseOperation(op); // Use data-operation for operators
        else if (text === "=") compute();
        else if (text === "AC") clear();
        else if (text === "⌫") deleteLast();
        updateDisplay();
    });
});

document.addEventListener("keydown", e => {
    if ((e.key >= 0 && e.key <= 9) || e.key === ".") appendNumber(e.key);
    else if (["+", "-", "*", "/"].includes(e.key)) chooseOperation(e.key);
    else if (e.key === "Enter" || e.key === "=") compute();
    else if (e.key === "Backspace") deleteLast();
    else if (e.key === "Escape") clear();
    updateDisplay();
});

themeToggle.addEventListener("click", toggleTheme);
updateDisplay();
