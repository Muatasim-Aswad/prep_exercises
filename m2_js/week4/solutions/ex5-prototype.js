import { message } from './utils/messages.js';

function Wallet(name, cash) {
  this._name = name;
  this._cash = cash;
  this._dailyAllowance = 50;
  this._dayTotalWithdrawals = 0;
}

Wallet.prototype.getCurrentAllowance = function () {
  return this._dailyAllowance - this._dayTotalWithdrawals;
};

Wallet.prototype.setDailyAllowance = function (newAllowance) {
  this._dailyAllowance = newAllowance;
  const currentAllowance = this._dailyAllowance - this._dayTotalWithdrawals;
  message.setDailyAllowance(this._dailyAllowance, currentAllowance);
};

Wallet.prototype.resetDailyAllowance = function () {
  this._dayTotalWithdrawals = 0;
  message.resetLimit(this._dailyAllowance);
};

Wallet.prototype.withdraw = function (amount) {
  if (this._cash - amount < 0) {
    message.withdrawFailureInsufficient(amount, this._cash);
    return 0;
  }

  const currentAllowance = this._dailyAllowance - this._dayTotalWithdrawals;
  if (amount > currentAllowance) {
    message.withdrawFailureLimit(amount, currentAllowance);
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount;
  return amount;
};

Wallet.prototype.deposit = function (amount) {
  this._cash += amount;
};

Wallet.prototype.transferInto = function (wallet, amount) {
  const withdrawnAmount = this.withdraw(amount);
  if (withdrawnAmount) {
    message.transfer(amount, this._name, wallet.getName());
    wallet.deposit(withdrawnAmount);
  }
};

Wallet.prototype.reportBalance = function () {
  message.reportBalance(this._name, this._cash);
};

Wallet.prototype.getName = function () {
  return this._name;
};

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

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
