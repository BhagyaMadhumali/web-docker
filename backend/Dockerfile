# Use Node LTS Alpine
FROM node:20-alpine

WORKDIR /app

# Install build tools for bcrypt
RUN apk add --no-cache python3 make g++

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Copy rest of the app
COPY . .

# Expose backend port
EXPOSE 4000

# Start with nodemon
CMD ["npx", "nodemon", "index.js"]
