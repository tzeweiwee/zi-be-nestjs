import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all products',
    type: [Product],
  })
  findAll(@Query() query: { productCode: number; location: string }) {
    return this.productsService.findAll(query);
  }

  @Patch(':productCode')
  update(
    @Param('productCode') productCode: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+productCode, updateProductDto);
  }

  @Delete(':productCode')
  remove(@Param('productCode') productCode: string) {
    return this.productsService.remove(+productCode);
  }
}
