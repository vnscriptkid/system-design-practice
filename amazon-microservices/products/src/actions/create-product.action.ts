import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Category } from 'src/models/category.entity';
import { Product } from 'src/models/product.entity';
import { RedisService } from 'src/redis.service';

@Injectable()
export class CreateProductAction {
    constructor(
        private readonly redisService: RedisService,
        @Inject('PRODUCTS_REPOSITORY') private readonly productsRepo: typeof Product,
        @Inject('CATEGORIES_REPOSITORY') private readonly categoriesRepo: typeof Category,
    ) { }

    async execute(attrs: { name: string, description: string, price: number, category_id: string }) {
        const category = await this.categoriesRepo.findByPk(attrs.category_id);

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const { id } = await this.productsRepo.create({
            name: attrs.name,
            description: attrs.description,
            price: attrs.price,
            category_id: attrs.category_id
        })

        const product = await this.productsRepo.findByPk(id, { include: [Category] });

        await this.redisService.publishProductCreated(product.toData())
    }
}