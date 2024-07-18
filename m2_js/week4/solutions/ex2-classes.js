import { message } from './utils/messages.js';

class Wallet {
  #name;
  #cash;
  #dailyAllowance = 50;
  #dayTotalWithdrawals = 0;
  get currentAllowance() {
    return this.#dailyAllowance - this.#dayTotalWithdrawals;
  }

  constructor(name, cash) {
    this.#name = name;
    this.#cash = cash;
  }

  set dailyAllowance(newAllowance) {
    this.#dailyAllowance = newAllowance;
    message.setDailyAllowance(this.#dailyAllowance, this.currentAllowance);
  }

  resetDailyAllowance() {
    this.#dayTotalWithdrawals = 0;
    message.resetLimit(this.#dailyAllowance);
  }

  withdraw(amount) {
    if (this.#cash - amount < 0) {
      message.withdrawFailureInsufficient(amount, this.#cash);
      return 0;
    }

    if (amount > this.currentAllowance) {
      message.withdrawFailureLimit(amount, this.currentAllowance);
      return 0;
    }

    this.#cash -= amount;
    this.#dayTotalWithdrawals += amount;
    return amount;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  transferInto(wallet, amount) {
    const withdrawnAmount = this.withdraw(amount);
    if (withdrawnAmount) {
      message.transfer(amount, this.#name, wallet.name);
      wallet.deposit(withdrawnAmount);
    }
  }

  reportBalance() {
    message.reportBalance(this.#name, this.#cash);
  }

  get name() {
    return this.#name;
  }
}

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
  walletJack.dailyAllowance = 90;
  walletJack.transferInto(walletJoe, 40);

  //test reset daily allowance
  console.log('\n');
  walletJack.transferInto(walletJoe, 10);
  walletJack.resetDailyAllowance();
  walletJack.transferInto(walletJoe, 10);
}

main();
