import { message } from './utils/messages.js';

/**
 * This is the closure way of doing things and we have already completed it for you so you don't need to do anything.
 * We leave it here as an example of how your other implementations should work!
 */

function createWallet(name, cash = 0) {
  let dailyAllowance = 50;
  let dayTotalWithdrawals = 0;

  function deposit(amount) {
    cash += amount;
  }

  function withdraw(amount) {
    if (cash - amount < 0) {
      message.withdrawFailureInsufficient(amount, cash);
      return 0;
    }

    const currentAllowance = dailyAllowance - dayTotalWithdrawals;
    if (amount > currentAllowance) {
      message.withdrawFailureLimit(amount, currentAllowance);
      return 0;
    }

    cash -= amount;
    dayTotalWithdrawals += amount;
    return amount;
  }

  function transferInto(wallet, amount) {
    const withdrawnAmount = withdraw(amount);
    if (withdrawnAmount) {
      message.transfer(amount, name, wallet.getName());
      wallet.deposit(withdrawnAmount);
    }
  }

  function setDailyAllowance(newAllowance) {
    dailyAllowance = newAllowance;
    const currentAllowance = dailyAllowance - dayTotalWithdrawals;
    message.setDailyAllowance(dailyAllowance, currentAllowance);
  }

  function resetDailyAllowance() {
    dayTotalWithdrawals = 0;
    message.resetLimit(dailyAllowance);
  }

  function reportBalance() {
    message.reportBalance(name, cash);
  }

  const getName = () => name;

  return {
    deposit,
    withdraw,
    transferInto,
    setDailyAllowance,
    resetDailyAllowance,
    reportBalance,
    getName,
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  //test main functions
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
