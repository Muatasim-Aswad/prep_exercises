import { message } from './utils/messages.js';

class Wallet {
  #name;
  #cash;

  constructor(name, cash) {
    this.#name = name;
    this.#cash = cash;
  }

  get name() {
    return this.#name;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    if (this.#cash - amount < 0) {
      message.withdrawFailureInsufficient(amount, this.#cash);
      return 0;
    }

    this.#cash -= amount;
    return amount;
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
}

main();
