# Use Node.js version 14 as base image
FROM node:21-alpine3.17

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD [ "npm", "run", "start:dev" ]
