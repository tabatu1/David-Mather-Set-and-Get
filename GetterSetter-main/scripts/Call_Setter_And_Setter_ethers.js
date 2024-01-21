const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
console.log("Running...")


const fs = require('fs');
const outputFile = "../output/output.json"
const{ ethers } = require ("ethers");
const contract = require ("../artifacts/contracts/GetterSetter.sol/GetterSetter.json");
//require('dotenv').config()



const dotenv = require('dotenv');

// Load environment variables from a specific path
const result = dotenv.config({ path: '../.env' }); // Replace '/path/to/your/.env' with your file path

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
const getterSetterContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)

// better way to do this but for now
theValue = "dave mather";


async function main() {

    await getterSetterContract.on("SetBytes", (from, value) => {

        let info = {
            from: from,
            value: ethers.utils.formatUnits (value, 0),
        };
        console.log("");
        console.log("The event lister has come back with the info:");
        console.log(JSON.stringify(info, null, 4));
        console.log("");
        console.log("Lets call the Bytes getter")
    });


  
    const theValueByteArray = ethers.utils.toUtf8Bytes(theValue);

    console.log("Calling the Bytes setter")

	let tx = await getterSetterContract.requestedBytes("0x4554480000000000000000000000000000000000000000000000000000000001",theValueByteArray)
    console.log("Awaiting response...")
    await tx.wait();


    const value2 = await getterSetterContract.getBytes();

    const yourString = ethers.utils.toUtf8String(value2);

    console.log("The getter returned ...")
    console.log(yourString)

    fs.appendFile(outputFile, '\n' + '\t' + '"value": ' + '\"' + yourString + '\"' + '\n' +'}' + '\n', 'utf8', (err) => {
    if (err) {
        console.error('Error appending text:', err);
        return;
    }

   });

    getterSetterContract.removeAllListeners();

    console.log("Exiting the script that gets and sets...")

}

main();
