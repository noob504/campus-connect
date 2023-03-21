# Use an official Node.js runtime as a parent image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code to the container
COPY . .

# Expose port 5000 for the Node.js server to listen on
EXPOSE 5000

# Start the Node.js server
CMD ["npm", "start"]
