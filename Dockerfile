# Step 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

# Step 2: Setup for production
FROM node:20-alpine

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy production dependencies and dist
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY ecosystem.config.js ./

# Expose the port
EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]
