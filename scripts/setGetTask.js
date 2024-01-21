const setter_And_Getter_ethers = require("./scripts/Call_Setter_And_Getter_ethers.js");

// Register Hardhat task
task("Call_Setter_And_Setter_ethers", "Sets a value and then gets that value in a contract")
  .addParam("parametera", "This is the set and get value")
  .setAction(async (taskArgs, hre) => {
    await setter_And_Getter_ethers.run(taskArgs);
 });