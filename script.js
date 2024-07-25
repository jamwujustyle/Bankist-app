'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const printMovements = movements => {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type
           movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcPrintBalance = acc => {
  acc.balance = acc.movements.reduce((acc, el) => acc + el, 0);
  labelBalance.innerHTML = `${acc.balance} EUR`;
};

const createUsername = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(el => el[0])
      .join('');
    return acc.username;
  });
};
createUsername(accounts);

const updateUI = acc => {
  printMovements(acc.movements);
  calcPrintBalance(acc);
  calcPrintSummary(acc);
};

// const maxValue = movements.reduce(
//   (acc, el, i) => (acc > el ? acc : el),
//   movements[0]
// );

const eurToUsd = 1.1;

const totalDepositsUsd = movements
  .filter(mov => mov > 0)
  .map((mov, _, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

const calcPrintSummary = account => {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc - mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter((mov, _, arr) => {
      return mov >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = interest;
};

let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
  }
});

/*
console.log(accounts);

const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

console.log(movements);

const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0);
console.log(balance);
*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/*
const arr = ['a', 'b', 'c', 'd', 'e'];
// slice
console.log(arr.slice(2, 4));
console.log(...arr.slice(-2));
console.log(arr.slice(1, -2));

// splice
// console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr.splice(2, 3));
console.log(arr); // mutates original array

// reverse

const arr2 = ['j', 'q', 'p', 'n', 'h'];
console.log(arr2.reverse().join(''));
console.log(arr2); // mutates original array

// concat merges two arrays
const letters = arr.concat(arr2);
console.log(letters); // does not mutate
const combinedArray = [...arr, ...arr2];

//  join

console.log(letters.join(' - '));

const numArr = [23, 52, 64];
console.log(numArr[0]);
console.log(numArr.at(0));

console.log(numArr[numArr.length - 1]);
console.log(numArr.at(-1));
console.log(numArr.slice(-1)[0]);

// for (const movement of movements)
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`movements ${i + 1}:  you deposited ${movement}`);
  } else {
    console.log(`movements ${i + 1}: you withdrew ${Math.abs(movement)}`);
  }
}
console.log(`--------forEach--------`);
movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`movements ${i + 1}:  you deposited ${mov}`);
  } else {
    console.log(`movements ${i + 1}: you withdrew ${Math.abs(mov)}`);
  }
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

console.log('SET');
const uniqueCurrencies = new Set(['USD', 'GBP', 'GBP', 'EUR']);
uniqueCurrencies.forEach((value, _, set) => {
  console.log(`${value}: ${value}`);
});

const eurToUsd = 1.1;

const movementsUsd = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUsd);

let arr = [];

for (const mov of movements) {
  let i = mov * eurToUsd;
  i = parseFloat(i.toFixed(2));
  arr.push(i);
}
console.log(arr);

const movementsDescriptions = movements.map((mov, i) => {
  `movement ${i + 1}:  you ${mov > 0 ? 'deposited' : 'withdrew'} ${mov}`;
});
console.log(movementsDescriptions);

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

for (const account of accounts)
  if (account.owner === 'Jessica Davis') console.log(account);
*/
