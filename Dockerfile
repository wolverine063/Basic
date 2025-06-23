FROM node:18

# Set the working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 5173

# Run the development server and expose it to all hosts
CMD ["npm", "run", "dev", "--", "--host"]
