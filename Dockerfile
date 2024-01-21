# Use Ubuntu as the base image
FROM ubuntu:latest

# Update package lists and install required dependencies (curl in this case)
RUN apt-get update && \
    apt-get install -y curl

# Add repository for Node.js 20.x
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js and npm
RUN apt-get install -y nodejs

# Install jq
RUN apt-get update \
    && apt-get install -y jq \
    && rm -rf /var/lib/apt/lists/*

# Check installed versions of Node.js and npm
RUN node -v && npm -v

# Set the working directory in the container
WORKDIR /app

# Copy your project files to the container
COPY . /app


RUN npm install --save-dev hardhat

# Set the command to start your Hardhat environment
CMD ["./scripts/dave_mather_start.sh"]
