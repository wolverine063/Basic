# Step 1: Base image
FROM node:18

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy backend source code
COPY . .

# Step 6: Expose backend port (change if needed)
EXPOSE 5000

# Step 7: Start backend
CMD ["npm", "start"]
