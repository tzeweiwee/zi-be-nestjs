import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ProductLocation } from 'src/common/enums/product-location.enum';

export class GetProductsDto {
  @ApiProperty({
    example: ProductLocation.WEST_MALAYSIA,
    enum: ProductLocation,
    required: false,
  })
  @IsEnum(ProductLocation)
  @IsOptional()
  location: ProductLocation;

  @ApiProperty({ example: 1000, description: 'Product code', required: false })
  @IsOptional()
  productCode: number;
}
