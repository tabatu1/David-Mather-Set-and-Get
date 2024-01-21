const fs = require('fs');
//const { spawn } = require('child_process');
//const path = require('path');
//const { exec } = require('child_process');

async function main() {
console.log("Running...")
const GetterSetter = await ethers.getContractFactory("GetterSetter");
const Getter_Setter = await GetterSetter.deploy();
const deployerAddressFile = '../output/deployerAddress.txt';
const contractAddressFile = '../output/contractAddress.txt';


await Getter_Setter.deployed();

// Getting the transaction receipt
const txReceipt = await Getter_Setter.deployTransaction.wait(); // Waiting for the transaction to be mined

// Retrieving the deployer address from the receipt and saving it to file
const deployerAddress = txReceipt.from;
console.log("Deployer Address:", deployerAddress);
fs.writeFileSync(deployerAddressFile, deployerAddress)

// Retrieving the contract address from the receipt and saving it to file
getter_Setter_Address = Getter_Setter.address
console.log('Contract deployed at address:', getter_Setter_Address);
fs.writeFileSync(contractAddressFile, getter_Setter_Address)

}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
