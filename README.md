# ZI-BE-NESTJS

This test project is designed to run in a Dockerized environment using Docker Compose, with Postgres as the database and Drizzle ORM for database management. Follow the steps below to set up and run the application locally.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (with [pnpm](https://pnpm.io/) as the package manager)
- A `.env` file for environment variables (see **Environment Setup**)

## Environment Setup

Create a `.env` file in the root directory to store environment variables securely.
For quick start, please copy over `.env.example`.

## How to Run Locally

1. Start the Dockerized Environment
   Run the application locally on Docker using Docker Compose:

```bash
docker compose up
```

This command will:

- Start the Postgres database and other required services.
- Expose the application on the specified port (usually 3000 if configured as such).

2. Run Drizzle ORM Migrations
   After the services are running, generate, apply, and seed the database schema with Drizzle ORM commands:

```bash
pnpm run db:generate # Generate migration files
pnpm run db:push # Apply migrations to the database
pnpm run db:seed # Seed the database with initial data
```

These commands will:

- db:generate: Create migration files based on the schema.
- db:push: Apply the generated migrations to the database.
- db:seed: Seed the database with initial data with all the products.

## Usage

Once the environment is set up, access the application's Swagger on http://localhost:8000/api (or the specified port) to start interacting with the API.

### Products API

Please check http://localhost:8000/api#/Products/ to check all CRUD endpoints. Create, update and delete endpoints will require a JWT token which can be generated on Swagger Auth API section.
