# Use Node.js 20 LTS
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the binary file to the working directory
COPY dist/bin/main ./bin/main

# Expose the port on which your app runs
EXPOSE 3000

# Command to run the app using the binary
CMD ["./bin/main"]