# -------- Step 1: Build the frontend --------
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Build the Vite app with correct environment variable
RUN npm run build


# -------- Step 2: Serve with a lightweight web server --------
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose Vite's production port (usually 80)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
