import eurosFormatter from './euroFormatter.js';

export const message = {
  withdrawFailureInsufficient(amount, cash) {
    console.log(
      `FAILED to withdraw ${eurosFormatter.format(
        amount,
      )}. You only HAVE ${eurosFormatter.format(cash)}.`,
    );
  },
  withdrawFailureLimit(amount, currentAllowance) {
    console.log(
      `FAILED to withdraw ${eurosFormatter.format(
        amount,
      )}. Your DAILY LIMIT is ${eurosFormatter.format(currentAllowance)}!`,
    );
  },
  transfer(amount, senderName, receiverName) {
    console.log(
      `Transferring ${eurosFormatter.format(
        amount,
      )} from ${senderName} to ${receiverName}`,
    );
  },
  setDailyAllowance(dailyAllowance, currentAllowance) {
    console.log(
      `Daily allowance set to: ${eurosFormatter.format(
        dailyAllowance,
      )}. Remaining: ${eurosFormatter.format(currentAllowance)}`,
    );
  },
  resetLimit(dailyAllowance) {
    console.log(`Limit is renewed: ${eurosFormatter.format(dailyAllowance)}`);
  },
  reportBalance(name, cash) {
    console.log(`Name: ${name}, balance: ${eurosFormatter.format(cash)}`);
  },
};
