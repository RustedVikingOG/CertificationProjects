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
    status: 'CLOSED',
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
const registerContentsDisplay = document.querySelector('.rc-display');
const registerStatusDisplay = document.querySelector('.rs-display');


let maxItemLength = 0;
const updateRegisterDisplay = () => {
    registerContentsDisplay.innerHTML = '';
    state.cid.forEach(item => {
        const itemLength = item[0].length
        if (itemLength > maxItemLength) {
            maxItemLength = itemLength;
        }
    });
    state.cid.forEach(item => {
        const itemLength = item[0].length
        const genZerosContent = '0'.repeat(maxItemLength - itemLength);
        
        const div = document.createElement('div');
        div.innerHTML = `<span>${genZerosContent}</span>${item[0]}: $${item[1]}`;
        registerContentsDisplay.appendChild(div);
    });

    const genZerosStatus = '0'.repeat(maxItemLength - 'Status'.length);
    registerStatusDisplay.innerHTML = `<span>${genZerosStatus}</span>Status: ${state.status}`;
}

window.onload = updateRegisterDisplay();

// reset = maxItemLength

resetBtn.addEventListener('click', () => {
    state.cid = registerContents;
    state.status = 'CLOSED';
    state.alert = '';
    priceInput.value = '1.87';
    updateRegisterDisplay();
});

closeDrawerBtn.addEventListener('click', () => {
    state.status = 'CLOSED';
    updateRegisterDisplay();
});

// changeDue
// cashGiven

