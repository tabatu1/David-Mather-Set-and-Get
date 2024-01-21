const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path'); 
const { exec } = require('child_process');


async function main() {

const GetterSetter = await ethers.getContractFactory("GetterSetter");
const Getter_Setter = await GetterSetter.deploy();
const filePath = '../output/output.json';
const envFile = '../.env';
  


await Getter_Setter.deployed();

console.log("Contract Deployed to Address:", Getter_Setter.address);

// Getting the transaction receipt
const txReceipt = await Getter_Setter.deployTransaction.wait(); // Waiting for the transaction to be mined
  
// Retrieving the deployer's address from the receipt
const deployerAddress = txReceipt.from;
console.log("Deployer Address:", deployerAddress);

getter_Setter_Address = Getter_Setter.address
console.log('Contract deployed at address:', getter_Setter_Address);


const args = ['deployerAddress="$deployerAddress"', 'getter_Setter_Address="$getter_Setter_Address"', 'filePath="$filePath"']



await fs.promises.appendFile("../output/output.json",  '\t' + '"deployer address": '+ '\"' + deployerAddress + '\"', 'utf8', (err) => {
   if (err) {
       console.error('Error appending text:', err);
       return;
   }
    console.log('Text appended successfully!');
  });

await fs.promises.appendFile(filePath, '\n' + '\t' + '"contract address": '+ '\"' + getter_Setter_Address + '\"', 'utf8', (err) => {
   if (err) {
       console.error('Error appending text:', err);
       return;
   }
    console.log('Text appended successfully!');
  });


await fs.promises.appendFile(envFile, '\n' + "CONTRACT_ADDRESS = " + '\"' + getter_Setter_Address + '\"', 'utf8', (err) => {
   if (err) {
       console.error('Error appending text:', err);
       return;
   }
    console.log('Text appended successfully!');
  });





}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
