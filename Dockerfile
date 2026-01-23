FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript
RUN npm run build

# App runs on port 8080
EXPOSE 8080

# Run the compiled JS
CMD ["node", "build/app.js"]
