
# Dockerfile
# ==== CONFIGURE =====
FROM node:18-alpine as build
# Set the working directory to /app inside the container
WORKDIR /app
# Optimization
COPY ./package.json .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# Copy app files
COPY . .
# Build the app
RUN npm run build

# ==== RUN =======
FROM node:18-alpine as run
WORKDIR /app
COPY --from=build /app/build ./build
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Install server
RUN npm i --global serve
# Run the app
CMD ["serve", "-s", "build"]
