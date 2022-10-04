import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { Product } from './models/product.entity';
import { Category } from './models/category.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const productModel = app.get('PRODUCTS_REPOSITORY') as typeof Product;
  const categoryModel = app.get('CATEGORIES_REPOSITORY') as typeof Category;

  await seedsDatabase({ productModel, categoryModel })

  await app.listen(3000);
}
bootstrap();

async function seedsDatabase(args: { productModel: typeof Product; categoryModel: typeof Category; }) {
  if ((await args.categoryModel.count()) === 0) {
    await args.categoryModel.bulkCreate([{
      name: 'cat-1',
    },
    {
      name: 'cat-2',
    },
    {
      name: 'cat-3',
    }])
    console.info(`categories seeded`)
  }

}

