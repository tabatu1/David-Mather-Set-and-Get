# Use Ubuntu as the base image
FROM ubuntu:latest

# Update package lists and install required dependencies (curl in this case)
RUN apt-get update && \
    apt-get install -y curl

# Add repository for Node.js 20.x
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js and npm
RUN apt-get install -y nodejs

# Check installed versions of Node.js and npm
RUN node -v && npm -v


# Set the working directory in the container
WORKDIR /app

# Copy your project files to the container
COPY . /app

# INSTALL DEPENDENCIES
#RUN apt update -y
#RUN apt install < ./requirements.txt -y
#RUN apt install nodejs -y
#RUN apt install npm -y

RUN npm install --save-dev hardhat
#RUN npm i -g npx
# Set the command to start your Hardhat environment
CMD ["./scripts/dave_mather_start.sh"]
