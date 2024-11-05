import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, IsEnum } from 'class-validator';
import { ProductLocation } from 'src/common/enums/product-location.enum';

export class CreateProductDto {
  @ApiProperty({ example: 'SUV', description: 'Description' })
  @IsNotEmpty()
  description: string;

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
