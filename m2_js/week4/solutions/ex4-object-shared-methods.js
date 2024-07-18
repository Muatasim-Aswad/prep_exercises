import { message } from './utils/messages.js';

function getCurrentAllowance() {
  return this._dailyAllowance - this._dayTotalWithdrawals;
}

function setDailyAllowance(newAllowance) {
  this._dailyAllowance = newAllowance;
  message.setDailyAllowance(this._dailyAllowance, this.getCurrentAllowance());
}

function resetDailyAllowance() {
  this._dayTotalWithdrawals = 0;
  message.resetLimit(this._dailyAllowance);
}

function withdraw(amount) {
  if (this._cash - amount < 0) {
    message.withdrawFailureInsufficient(amount, this._cash);
    return 0;
  }

  if (amount > this.getCurrentAllowance()) {
    message.withdrawFailureLimit(amount, this.getCurrentAllowance());
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount;
  return amount;
}

function deposit(amount) {
  this._cash += amount;
}

function transferInto(wallet, amount) {
  const withdrawnAmount = this.withdraw(amount);
  if (withdrawnAmount) {
    message.transfer(amount, this._name, wallet.getName());
    wallet.deposit(withdrawnAmount);
  }
}

function reportBalance() {
  message.reportBalance(this._name, this._cash);
}

function getName() {
  return this._name;
}

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: 50,
    _dayTotalWithdrawals: 0,
    getCurrentAllowance,
    setDailyAllowance,
    resetDailyAllowance,
    withdraw,
    deposit,
    transferInto,
    reportBalance,
    getName,
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);
  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();

  //test daily allowance
  console.log('\n');
  walletJack.transferInto(walletJoe, 40);

  //test set daily allowance
  walletJack.setDailyAllowance(90);
  walletJack.transferInto(walletJoe, 40);

  //test reset daily allowance
  console.log('\n');
  walletJack.transferInto(walletJoe, 10);
  walletJack.resetDailyAllowance();
  walletJack.transferInto(walletJoe, 10);
}

main();
