# Use Node.js 20 LTS on Alpine Linux
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the generated dist directory to the working directory
COPY dist ./dist

# Install production dependencies if any (optional step)
# RUN npm ci --only=production

# Expose the port on which your app runs
EXPOSE 3000

# Command to run the app using the generated index.js
CMD ["node", "dist/index.js"]
