const { ethers } = require("ethers");
const fs = require('fs');
const dotenv = require('dotenv');
const { task } = require("hardhat/config");

task("Call_Setter_And_Setter_ethers", "A set and get task using ethers.js")
  .addParam("parama", "The value to set")
  .setAction(async (taskArgs, hre) => {
    const { parama } = taskArgs;     //parama is the value passed in originally via the command line

    console.log("Running the Getter and Setter Script...");

    const API_URL = process.env.API_URL;
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

    //Load environment variables from a specific path
    const result = dotenv.config({ path: '.env' });
    if (result.error) {
      console.error(result.error);
      // Handle error loading .env file
    } else {
      console.log('Environment variables loaded successfully');
    }

    // Provider
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    // Signer
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    // Contract
    const contract = require("../artifacts/contracts/GetterSetter.sol/GetterSetter.json");

    const getterSetterContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

    const theValueByteArray = ethers.utils.toUtf8Bytes(parama);

    await setValue(getterSetterContract, parama);  // Pass getterSetterContract to main function
    await getValue(getterSetterContract, parama);  // Pass getterSetterContract to main function

  });

// Set the value
async function setValue(getterSetterContract, parama) {

  await getterSetterContract.on("SetBytes", (from, value) => {
    let info = {
      from: from,
      value: ethers.utils.formatUnits(value, 0),
    };
    console.log("");
    console.log("The event listener has come back with the info:");
    console.log(JSON.stringify(info, null, 4));
    console.log("");

  });

  // Format the byte string in to Utf8Bytes, a format that requestedBytes uses to hand over to the contract
  const theValueByteArray = ethers.utils.toUtf8Bytes(parama);

  console.log("Calling the Bytes setter");

  // Reusing 0x4554480000000000000000000000000000000000000000000000000000000001 as the requestID
  let tx = await getterSetterContract.requestedBytes("0x4554480000000000000000000000000000000000000000000000000000000001", theValueByteArray);
  console.log("Awaiting response...");
  await tx.wait();
}

// Get the value
async function getValue(getterSetterContract, parama) {

  console.log("Calling the the Bytes getter");

  const getBytesValue = await getterSetterContract.getBytes();

  // Format the byte string back to a string
  const theString = ethers.utils.toUtf8String(getBytesValue);

  console.log("Got the byte value");

  fs.writeFileSync("../output/theGotString.txt", theString);

  getterSetterContract.removeAllListeners();

  console.log("Exiting the script that gets and sets...");
};
