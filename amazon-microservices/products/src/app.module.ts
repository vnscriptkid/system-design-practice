import { Module } from '@nestjs/common';
import { CreateProductAction } from './actions/create-product.action';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { categoriesProviders, productsProviders } from './providers';
import { RedisService } from './redis.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    RedisService,
    ...productsProviders,
    ...categoriesProviders,
    CreateProductAction],
})
export class AppModule { }
