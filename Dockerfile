# Base image with dependencies
FROM node:20.12.1-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN pnpm run build

# Final stage to keep only necessary files
FROM node:20.12.1-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/src/app

# Copy only production node_modules and dist folder
COPY --from=base /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=base /usr/src/app/dist /usr/src/app/dist
COPY package*.json ./


# Expose the application port
EXPOSE 8000

# Start the application
CMD [ "pnpm", "start:prod" ]

