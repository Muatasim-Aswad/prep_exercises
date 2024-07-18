import { message } from './utils/messages.js';

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: 50,
    _dayTotalWithdrawals: 0,

    get currentAllowance() {
      return this._dailyAllowance - this._dayTotalWithdrawals;
    },

    set dailyAllowance(newAllowance) {
      this._dailyAllowance = newAllowance;
      message.setDailyAllowance(this._dailyAllowance, this.currentAllowance);
    },

    resetDailyAllowance() {
      this._dayTotalWithdrawals = 0;
      message.resetLimit(this._dailyAllowance);
    },

    withdraw: function (amount) {
      if (this._cash - amount < 0) {
        message.withdrawFailureInsufficient(amount, this._cash);
        return 0;
      }

      if (amount > this.currentAllowance) {
        message.withdrawFailureLimit(amount, this.currentAllowance);
        return 0;
      }

      this._cash -= amount;
      this._dayTotalWithdrawals += amount;
      return amount;
    },

    deposit: function (amount) {
      this._cash += amount;
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

  //test daily allowance
  console.log('\n');
  walletJack.transferInto(walletJoe, 40);

  //test set daily allowance
  walletJack.dailyAllowance = 90;
  walletJack.transferInto(walletJoe, 40);

  //test reset daily allowance
  console.log('\n');
  walletJack.transferInto(walletJoe, 10);
  walletJack.resetDailyAllowance();
  walletJack.transferInto(walletJoe, 10);
}

main();
