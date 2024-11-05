import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProductLocation } from 'src/common/enums/product-location.enum';
import { IsEnum, IsNotEmpty, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 100.0, description: 'Price' })
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({
    example: ProductLocation.WEST_MALAYSIA,
    enum: ProductLocation,
  })
  @IsNotEmpty()
  @IsEnum(ProductLocation)
  location: ProductLocation;

  @ApiProperty({ example: 1000, description: 'Product code' })
  @IsNotEmpty()
  productCode: number;
}
