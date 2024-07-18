import { message } from './utils/messages.js';

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,

    deposit: function (amount) {
      this._cash += amount;
    },

    withdraw: function (amount) {
      if (this._cash - amount < 0) {
        message.withdrawFailureInsufficient(amount, this._cash);
        return 0;
      }

      this._cash -= amount;
      return amount;
    },

    transferInto: function (wallet, amount) {
      const withdrawnAmount = this.withdraw(amount);
      if (withdrawnAmount) {
        message.transfer(amount, this._name, wallet.getName());
        wallet.deposit(withdrawnAmount);
      }
    },

    reportBalance: function () {
      message.reportBalance(this._name, this._cash);
    },

    getName: function () {
      return this._name;
    },
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
}

main();
