#!/bin/bash

# docker run usage help function
helpFunction()
{
   echo ""
   echo "-- v -> VALUE    -- i -> INFRURA_PROJECT_ID    -- p -> PRIVATE_KEY"
   echo ""
   echo ""
   echo "Docker Run Usage: docker run -e parameter -e parameter -e parameter dave-mather-deploy"
   echo -e "\t-e VALUE If this has spaces then please place is double quotes"
   echo -e "\t-e INFRURA_PROJECT_ID=https://eth-sepolia.g.alchemy.com/..."
   echo -e "\t-e PRIVATE_KEY=8cf4433c3ds89417----Your-Private-Key----1e50e3f8702e5h4s8d78ef28e"
   echo ""
   exit 1 # Exit script after printing help
}

while getopts "v:a:p:" opt
do
   case "$opt" in
      v ) parameterA="$OPTARG" ;;
      a ) parameterB="$OPTARG" ;;
      p ) parameterC="$OPTARG" ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done


# Print helpFunction in case parameters are empty
if [ -z "$parameterA" ] || [ -z "$parameterB" ] || [ -z "$parameterC" ]
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi

# Begin script in when all parameters are understood

# Create files/Empty existing files
> .env
> ../output/output1.json
> ../output/theGotString.txt


echo "API_URL = ""\"""$parameterB""\"" > .env
echo "PRIVATE_KEY = ""\"""$parameterC""\""  >> .env




# Deploy the contract to Sepolia
echo "Deploy the contract to Sepolia..."
npx hardhat run ../deployments/deploy.js --network sepolia


#Get the deployer and contract addresses from the deployment previously saved to a file
deployerAddress=$(< ../output/deployerAddress.txt)
getSetAddress=$(< ../output/contractAddress.txt)


#echo the contract address to the .env file  for usage by the Call_Setter_And_Setter_ethers task called below
echo "CONTRACT_ADDRESS = ""\"""$getSetAddress""\""  >> .env



# Run the getters and setters against the contract
echo "About to run the getters and setters against the contract:"
npx hardhat Call_Setter_And_Setter_ethers --parama "$parameterA"


# Retrieve the string that was got by the getter function
stringContent=$(< ../output/theGotString.txt)


# Create a JSON object
json_object=$(jq -n \
  --arg value1 "$deployerAddress" \
  --arg value2 "$getSetAddress" \
  --arg value3 "$stringContent" \
  '{"deployer address": $value1, "contract address": $value2, "value": $value3}'
)

# Write the JSON object to a file
echo "$json_object" > "../output/output1.json"

echo ""
echo "Output stored to ../output/output1.json"
echo ""
echo "Here are the output contents of that file in JSON format:"
echo ""
cat ../output/output1.json






