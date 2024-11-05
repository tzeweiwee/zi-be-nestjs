CREATE TYPE "public"."location" AS ENUM('west-malaysia', 'east-malaysia');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PRODUCT" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text,
	"location" "location" DEFAULT 'west-malaysia',
	"price" numeric(10, 2) NOT NULL
);
