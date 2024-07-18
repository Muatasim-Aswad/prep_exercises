import { message } from './utils/messages.js';

function Wallet(name, cash) {
  this._name = name;
  this._cash = cash;
}

Wallet.prototype.withdraw = function (amount) {
  if (this._cash - amount < 0) {
    message.withdrawFailureInsufficient(amount, this._cash);
    return 0;
  }

  this._cash -= amount;
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
}

main();
