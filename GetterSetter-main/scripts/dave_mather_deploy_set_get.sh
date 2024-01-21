#!/bin/bash

pwd
helpFunction()
{
   echo ""
   echo "Usage: $0 -v parameter -a parameter -p parameter"
   echo -e "\t-v VALUE If this has spaces then please place is double quotes"
   echo -e "\t-a PROJECT_ID or API_KEY"
   echo -e "\t-p PRIVATE_KEY"
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

# Begin script in case all parameters are correct
> ../.env
> ../output/output.json
echo "{" > ../output/output.json
echo "API_URL = ""\"""$parameterB""\"" > ../.env
echo "PRIVATE_KEY = ""\"""$parameterC""\""  >> ../.env
cp ../.env .

sed -i "/^theValue =/c\theValue = ""\"""$parameterA""\""";" Call_Setter_And_Setter_ethers.js

# Deploy the contract to Sepolia
echo "Deploy the contract to Sepolia..."
npx hardhat run ../deployments/deploy.js --network sepolia


cp ../.env .
# Run the getters and setters against the contract
echo "About to run the getters and setters against the contract..."
npx hardhat run Call_Setter_And_Setter_ethers.js

echo ""
echo "Output stored to ../output/output.json"
echo ""
echo "Here are the output contents of that file:"
echo ""
cat ../output/output.json






