const display = document.querySelector('.calculator-display');
const buttons = document.querySelector('.calculator-buttons');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let resetDisplay = false;

function updateDisplay(value) {
    if (resetDisplay) {
        display.value = value;
        resetDisplay = false;
    } else {
        display.value = display.value === '0' ? value : display.value + value;
    }
}

function clearAll() {
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    display.value = '0';
    resetDisplay = false;
}

function deleteLastDigit() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
    if (resetDisplay) {
        firstOperand = '';
    } else if (currentOperator === null) {
        firstOperand = display.value;
    } else {
        secondOperand = display.value;
    }
}

function chooseOperator(operator) {
    if (currentOperator !== null && !resetDisplay) {
        calculate();
    }
    firstOperand = display.value;
    currentOperator = operator;
    resetDisplay = true;
}

function calculate() {
    if (currentOperator === null || resetDisplay) return;

    secondOperand = display.value;
    let result;
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    if (isNaN(num1) || isNaN(num2)) return;

    switch (currentOperator) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;
        default:
            return;
    }
    display.value = parseFloat(result.toFixed(7)); // Limit decimal places for display
    firstOperand = display.value;
    secondOperand = '';
    currentOperator = null;
    resetDisplay = true;
}

buttons.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.matches('button')) return;

    const value = target.textContent;
    const action = target.dataset.action;

    if (!action) {
        updateDisplay(value);
    } else if (action === 'decimal') {
        if (!display.value.includes('.')) {
            updateDisplay('.');
        }
    } else if (action === 'clear') {
        clearAll();
    } else if (action === 'delete') {
        deleteLastDigit();
    } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        chooseOperator(action);
    } else if (action === 'calculate') {
        calculate();
    }
});

// Initialize display on load
clearAll();
