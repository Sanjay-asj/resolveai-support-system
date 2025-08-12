# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define the command to run your app when the container starts
CMD [ "node", "server.js" ]