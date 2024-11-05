import { ApiProperty } from '@nestjs/swagger';
import { ProductLocation } from 'src/common/enums/product-location.enum';

export class Product {
  @ApiProperty({ example: 1, description: 'Product ID' })
  id: number;

  @ApiProperty({ example: 123, description: 'Product code' })
  productCode: number;

  @ApiProperty({ example: 'SUV', description: 'Product description' })
  description: string;

  @ApiProperty({ example: 100.5, description: 'Product price' })
  price: number;

  @ApiProperty({
    example: ProductLocation.WEST_MALAYSIA,
    description: 'Location can be either West Malaysia or East Malaysia',
  })
  location: ProductLocation;
}
