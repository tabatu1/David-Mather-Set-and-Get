
Getter Setter Prereq, Deploy and Execute.
----------------------------------------

You will need:

    Your Metamask private key.
    An APIURL for Sepolia.
    

From the directory containing the Dockerfile:

Build the docker image:

    docker build -t dave-mather-deploy .

including the dot at the end of the above line.



Run a docker container which will kick off the start script. For this you must provide values to environment variables:

    docker run -it -e VALUE=Dave -e INFRURA_PROJECT_ID=https://eth-sepolia.g.alchemy.com/v2/kt4---Your-API-ADDR---VxE -e PRKEY=PRIVATE_KEY=8cf4433c3ds89417----Your-Private-Key----1e50e3f8702e5h4s8d78ef28e dave-mather-deploy


If your value has a space in it, use double quotes or single quotes around the value. e.g.

    docker run -it -e VALUE="Dave Mather 123" -e INFRURA_PROJECT_ID=https://eth-sepolia.g.alchemy.com/v2/kt4---Your-API-ADDR---VxE -e PRKEY=PRIVATE_KEY=8cf4433c3ds89417----Your-Private-Key----1e50e3f8702e5h4s8d78ef28e dave-mather-deploy

Avoid quotes and double quotes elsewhere in the command.
