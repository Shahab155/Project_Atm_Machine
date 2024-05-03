#! /usr/bin/env node

import inquirer from "inquirer";

let totalBalance = 20000;
const myPin = 2015;

console.log("*****Welcome to my ATM Machine.**** \n");
// 1. Generate question for pin code.
let pinAnswer = await inquirer.prompt({
  name: "pin",
  type: "number",
  message: "Enter your pin code: ",
});

// 2. Check pin code, if correct than tell user that your pin code is
// correct and ask for other actions.
if (pinAnswer.pin === myPin) {
  console.log("Correct pin code: ");
  let operationAnswer = await inquirer.prompt([
    {
      name: "account",
      type: "list",
      message: "Please select your account type.",
      choices: ["Current", "Saving"],
    },
    {
      name: "operation",
      type: "list",
      message: "Please select your option: ",
      choices: ["Fast Cash", "Other Amount", "Check Balance"],
    },
  ]);
  // 3. Check what user select cash withdraw or fast Cash.
  if (operationAnswer.operation === "Fast Cash") {
    let defaultAmountAnswer = await inquirer.prompt({
      name: "defaultAmount",
      type: "list",
      message: "Please select your default amount.",
      choices: ["500", "1000", "5000", "10000"],
    });

    // 4. Check if amount entered is <= to balance than subtract amount from balance and show result.
    if (defaultAmountAnswer.defaultAmount <= totalBalance) {
      totalBalance -= defaultAmountAnswer.defaultAmount;
      console.log(`Your current balance is ${totalBalance}.`);
    }
  }
  // 4. If users choose "Fast Cash" than show giving option and after
  //  processing tell them there remainig balance.
  if (operationAnswer.operation === "Other Amount") {
    let enteredAmount = await inquirer.prompt({
      name: "amount",
      type: "number",
      message: "Enter amount you want to withdraw.",
    });

    if (enteredAmount.amount <= totalBalance) {
      totalBalance -= enteredAmount.amount;
      console.log(`Your remainig balance is ${totalBalance}.`);
    } else {
      console.log("Insufficant balance.");
    }

    // 5. If users choose "check Balance " than tell them there total balance.
  } else if (operationAnswer.operation === "Check Balance") {
    console.log(`Your current balance is ${totalBalance}.`);
  }
} else {
  console.log("Incorrect pin code:");
}
