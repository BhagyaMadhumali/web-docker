# Use Node LTS Alpine
FROM node:20-alpine

WORKDIR /app

# Install build tools for native modules (bcrypt, etc.)
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json first (Docker layer caching)
COPY package*.json ./

# Install dependencies (including devDependencies for nodemon)
RUN npm install --include=dev

# Copy rest of the application
COPY . .

# Expose backend port
EXPOSE 4000

# Start the backend with nodemon for development
CMD ["npx", "nodemon", "index.js"]
