// Const for register contents
let cid = [["PENNY", 1.01],["NICKEL", 2.05],["DIME", 3.1],["QUARTER", 4.25],["ONE", 90],["FIVE", 55],["TEN", 20],["TWENTY", 60],["ONE HUNDRED", 100]]
let cid_base = [["PENNY", 1.01],["NICKEL", 2.05],["DIME", 3.1],["QUARTER", 4.25],["ONE", 90],["FIVE", 55],["TEN", 20],["TWENTY", 60],["ONE HUNDRED", 100]]
let denominations = {'PENNY': 0.01, 'NICKEL': 0.05, 'DIME': 0.1,'QUARTER': 0.25,'ONE': 1,'FIVE': 5,'TEN': 10,'TWENTY': 20,'ONE HUNDRED': 100}
let alertMessage;
window.alert = (message) => alertMessage = message;

let price = 1.87;
let status_ = 'CLOSED';

// Button elements from the DOM
const purchaseBtn = document.getElementById('purchase-btn');
const closeDrawerBtn = document.getElementById('close-btn');
const resetBtn = document.getElementById('reset-btn');

// Input elements from the DOM
const changeDue = document.getElementById('change-due');
const cashInput = document.getElementById('cash');
const priceInput = document.getElementById('default-price');

// Event listener for the default price input
priceInput.value = price;
priceInput.addEventListener('input', event => {
    price = parseFloat(event.target.value);
    }
);

// Display elements from the DOM
const registerContentsDisplay = document.querySelector('.rc-display');
const registerStatusDisplay = document.querySelector('.rs-display');


const checkCashRegister = (price, cash, cid) => {
    let sumInCid = cid.reduce((acc, curr) => acc + curr[1], 0);
    sumInCid = Math.round(sumInCid * 100) / 100;

    let change_due = cash - price;

    // no money
    if (change_due > sumInCid) {
        return {status: 'INSUFFICIENT_FUNDS', change: []};
    }

    // exact change
    if (change_due === sumInCid) {
        return {status: 'CLOSED', change: cid};
    }

    if (change_due === 0) {
        return {status: 'No change due - customer paid with exact cash', change: []};
    }

    if (change_due < 0) {
        return {status: 'Customer does not have enough money to purchase the item', change: []};
    }

    let reverse_cid = cid.slice().reverse();
    let cih = reverse_cid.map(([denomination, amount]) => {
        let denominationValue = denominations[denomination];
        let amountToReturn = 0;
        while (change_due >= denominationValue && amount > 0) {
            change_due -= denominationValue;
            amount -= denominationValue;
            amountToReturn += denominationValue;
            change_due = Math.round(change_due * 100) / 100;
        }
        return [denomination, amountToReturn];
    })

    // insufficient funds
    if (change_due > 0) {
        return {status: 'INSUFFICIENT_FUNDS', change: []};
    }

    return {status: 'OPEN', change: cih};
}

purchaseBtn.addEventListener('click', () => {
    let cash = cashInput.value;
    let result = checkCashRegister(price, cash, cid);

    if (result.status === 'INSUFFICIENT_FUNDS') {
        changeDue.innerText = `Status: ${result.status}`;

    } else if (result.status === 'Customer does not have enough money to purchase the item') {
        alert('Customer does not have enough money to purchase the item');

    } else if (result.status === 'OPEN' && result.change.length === 0) {
        changeDue.innerText = 'No change due - customer paid with exact cash';

    } else if (result.status === 'OPEN' && result.change.length > 0) {
        let t1 = `Status: ${result.status}`;
        let t2 = result.change.map(([denomination, amount]) => `${denomination}: $${amount}`).join(' ');
        changeDue.innerText = `${t1} ${t2}`;
    } else if (result.status === 'CLOSED' && result.change.length > 0) {
        let t1 = `Status: ${result.status}`;
        let t2 = result.change.map(([denomination, amount]) => `${denomination}: $${amount}`).join(' ');
        changeDue.innerText = `${t1} ${t2}`;
    } else {
        changeDue.innerText = result.status;
    }
});

const closeDrawer = () => {
    let cash = cashInput.value;
    let result = checkCashRegister(price, cash, cid);

    if (result.status !== 'CLOSED') {
        changeDue.innerText = `Status: REGISTER IS NOW CLOSED`;
    }
}

closeDrawerBtn.addEventListener('click', closeDrawer);

resetBtn.addEventListener('click', () => {
    changeDue.innerText = '';
    cashInput.value = '';
    priceInput.value = price;
    alertMessage = '';
    cid = cid_base;
})

const updateRegisterDisplay = () => {
    registerContentsDisplay.innerHTML = cid.map(([denomination, amount]) => `${denomination}: $${amount}`).join('<br>');
    registerStatusDisplay.innerText = alertMessage;
}

document.addEventListener('DOMContentLoaded', updateRegisterDisplay);
document.addEventListener('click', updateRegisterDisplay);