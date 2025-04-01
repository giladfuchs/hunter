# Use official Node.js image as the base image
FROM node:16-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code to the container
COPY . .

# Build the app
RUN npm run build

# Expose port 80 (for serving the app via a web server)
EXPOSE 80

# Serve the app using a simple HTTP server (serve is used to serve the static files)
RUN npm install -g serve

# Command to run when the container starts
CMD ["serve", "-s", "dist", "-l", "80"]
