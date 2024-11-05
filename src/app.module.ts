import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsController } from 'src/products/products.controller';
import { ProductsService } from 'src/products/products.service';
@Module({
  imports: [DrizzleModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
