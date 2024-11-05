import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from 'src/constants';
import { GetProductsDto } from 'src/products/dto/get-products.dto';
import * as schema from '../drizzle/schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PG_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.db
      .select()
      .from(schema.products)
      .where(
        and(
          eq(schema.products.productCode, createProductDto.productCode),
          eq(schema.products.location, createProductDto.location),
        ),
      )
      .execute();

    if (existingProduct.length > 0) {
      throw new ConflictException('Product code already exists');
    }

    return this.db
      .insert(schema.products)
      .values(createProductDto)
      .returning()
      .execute();
  }

  findAll({ productCode, location }: GetProductsDto) {
    const conditions = [];
    if (productCode !== undefined) {
      conditions.push(eq(schema.products.productCode, productCode));
    }
    if (location !== undefined) {
      conditions.push(eq(schema.products.location, location));
    }

    return this.db
      .select()
      .from(schema.products)
      .where(and(...conditions))
      .execute();
  }

  async update(updateProductDto: UpdateProductDto) {
    const updatedProducts = await this.db
      .update(schema.products)
      .set(updateProductDto)
      .where(
        and(
          eq(schema.products.productCode, updateProductDto.productCode),
          eq(schema.products.location, updateProductDto.location),
        ),
      )
      // return the updated product
      .returning()
      .execute();

    if (updatedProducts.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return updatedProducts;
  }

  async remove(productCode: number) {
    const removedProducts = await this.db
      .delete(schema.products)
      .where(eq(schema.products.productCode, productCode))
      .returning({ productCode: schema.products.productCode })
      .execute();

    if (removedProducts.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return removedProducts;
  }
}
