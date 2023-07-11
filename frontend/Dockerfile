# Use an official Node.js runtime as a parent image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm update
RUN npm install
RUN npm install -g vite

# Copy the rest of the application code to the container
COPY . .

# Build the Vite application
RUN npm run build

# Expose port 5000 for the Node.js server to listen on
EXPOSE 5173

# Start the Node.js server
ENTRYPOINT ["npm", "run","dev"]
