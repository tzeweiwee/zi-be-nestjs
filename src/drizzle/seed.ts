import { InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { products } from './schema';
import { configDotenv } from 'dotenv';

configDotenv();

type Product = InferSelectModel<typeof products>;

// Seed products
const productsData: Product[] = [
  {
    id: 1,
    productCode: 1000,
    description: 'Sedan',
    price: 300,
    location: 'west-malaysia',
  },
  {
    id: 2,
    productCode: 1000,
    description: 'Sedan',
    price: 450.0,
    location: 'east-malaysia',
  },
  {
    id: 3,
    productCode: 2000,
    description: 'SUV',
    price: 500.0,
    location: 'west-malaysia',
  },
  {
    id: 4,
    productCode: 2000,
    description: 'SUV',
    price: 650.0,
    location: 'east-malaysia',
  },
];

async function seedDatabase() {
  // Initialize PostgreSQL client and Drizzle ORM instance
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  const db = drizzle(client);

  // Seed the products table

  await db.insert(products).values(productsData);

  console.log('Seeding completed.');
  await client.end();
}

seedDatabase().catch((error) => {
  console.error('Seeding failed:', error);
});
