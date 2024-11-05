import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core';

export const locationEnums = pgEnum('location', [
  'west-malaysia',
  'east-malaysia',
]);

export const products = pgTable('PRODUCT', {
  id: serial('id').primaryKey(),
  productCode: integer('product_code').notNull(),
  description: text('description'),
  location: locationEnums().default('west-malaysia'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
});
