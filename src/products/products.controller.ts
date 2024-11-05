import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { CommonResponse } from 'src/common/dto/common-response.dto';
import { GetProductsDto } from 'src/products/dto/get-products.dto';
import { Product } from 'src/products/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Create a new product',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created new product',
    type: [Product],
  })
  @ApiResponse({
    status: 409,
    description: 'Product of same location and product code already exists',
  })
  @ApiBearerAuth()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<CommonResponse<Product[]>> {
    try {
      const data = await this.productsService.create(createProductDto);

      return {
        status: 'success',
        message: 'Product created successfully',
        data: data as Product[],
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          {
            status: 'error',
            message: error.message,
            error: 'Product of same location and product code already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          status: 'error',
          message: 'Error creating product',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get products based on product code and location (optional)',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all products',
    type: [Product],
  })
  async findAll(
    @Query() query: GetProductsDto,
  ): Promise<CommonResponse<Product[]>> {
    try {
      const data = await this.productsService.findAll(query);

      return {
        status: 'success',
        message: 'Products retrieved successfully',
        data: data as Product[],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: 'error',
          message: 'Error retrieving products',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Update product price based on product code and location',
    type: [Product],
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiOperation({
    summary: 'Update product price based on product code and location',
  })
  async update(
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<CommonResponse<Product[]>> {
    try {
      const data = await this.productsService.update(updateProductDto);

      if (!data) {
        return {
          status: 'error',
          message: 'Product not found',
        };
      }

      return {
        status: 'success',
        message: 'Product update successfully',
        data: data as Product[],
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: 'error',
            message: error.message,
            error: 'Product not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        {
          status: 'error',
          message: 'Error updating product',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':productCode')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Delete products based on product code',
  })
  @ApiResponse({
    status: 200,
    description: 'X Products(s) removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async remove(
    @Param('productCode', ParseIntPipe) productCode: number,
  ): Promise<CommonResponse<void>> {
    try {
      const removedProducts = await this.productsService.remove(productCode);

      return {
        status: 'success',
        message: `${removedProducts.length} Product(s) removed successfully`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: 'error',
            message: error.message,
            error: 'Product not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        {
          status: 'error',
          message: 'Error removing product',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
