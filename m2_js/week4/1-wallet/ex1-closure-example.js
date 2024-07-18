import eurosFormatter from './euroFormatter.js';

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
      console.log(`FAILED to withdraw ${eurosFormatter.format(amount)}.
       You only HAVE ${eurosFormatter.format(cash)}.`);
      return 0;
    }

    const nowAllowance = dailyAllowance - dayTotalWithdrawals;
    if (amount > nowAllowance) {
      console.log(
        `FAILED to withdraw ${eurosFormatter.format(
          amount,
        )}. Your LIMIT ${eurosFormatter.format(nowAllowance)}!`,
      );
      return 0;
    }

    cash -= amount;
    dayTotalWithdrawals += amount;
    return amount;
  }

  function transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(
        amount,
      )} from ${name} to ${wallet.getName()}`,
    );
    const withdrawnAmount = withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  function setDailyAllowance(newAllowance) {
    dailyAllowance = newAllowance;
    console.log(
      `Daily allowance set to: ${eurosFormatter.format(newAllowance)}`,
    );
  }

  function resetDailyAllowance() {
    dayTotalWithdrawals = 0;
    console.log(`Limit is renewed: ${eurosFormatter.format(dailyAllowance)}`);
  }

  function reportBalance() {
    console.log(`Name: ${name}, balance: ${eurosFormatter.format(cash)}`);
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

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();

  console.log('\n');
  walletJack.transferInto(walletJoe, 40);
  walletJack.setDailyAllowance(90);
  walletJack.transferInto(walletJoe, 40);
  console.log('\n');
  walletJack.transferInto(walletJoe, 10);
  walletJack.resetDailyAllowance();
  walletJack.transferInto(walletJoe, 10);
}

main();
