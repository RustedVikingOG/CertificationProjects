// Const for register contents
const registerContents = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]

// Initial state of the register
let state = {
    cid: [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]
    ],
    status: 'OPEN',
    alert: ''
};

// Button elements from the DOM
const purchaseBtn = document.getElementById('purchase-btn');
const closeDrawerBtn = document.getElementById('close-btn');
const resetBtn = document.getElementById('reset-btn');

// Input elements from the DOM
const changeDue = document.getElementById('change-due');
const cashGiven = document.getElementById('cash');
const priceInput = document.getElementById('default-price');

// Event listener for the default price input
let price = parseFloat(priceInput.value);
priceInput.addEventListener('input', event => {
    price = parseFloat(event.target.value);
    }
);

// Display elements from the DOM
const registerContentsDisplay = document.querySelector('rc-display');
const registerStatusDisplay = document.querySelector('rs-display');


const updateRegisterContentsDisplay = () => {
    registerContentsDisplay.innerHTML = '';
    state.cid.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `${item[0]}: $${item[1]}`;
        registerContentsDisplay.appendChild(div);
    });
}

const updateRegisterStatusDisplay = () => {
    registerStatusDisplay.HTMLcontent = `Status: ${state.status}`;
}

updateRegisterContentsDisplay();

// const updateUI = () => {
//     updateRegisterContentsDisplay();
//     updateRegisterStatusDisplay();
// }

// window.addEventListener('load', updateUI());



