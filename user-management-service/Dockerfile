# Use the official Node.js 20 Alpine image as a base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++ 

# Copy package.json and yarn.lock (or package-lock.json) files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Ensure .env file is copied (if you have one)
COPY .env ./

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "src/server.js"]
