FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads/documents

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"] 