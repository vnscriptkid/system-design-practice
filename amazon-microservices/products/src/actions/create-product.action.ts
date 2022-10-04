import { Injectable, Inject } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { RedisService } from 'src/redis.service';

@Injectable()
export class CreateProductAction {
    constructor(
        private readonly redisService: RedisService,
        @Inject('PRODUCTS_REPOSITORY') private readonly productsRepo: typeof Product
    ) { }

    async execute(attrs: { name: string, description: string, price: number, category_id: string }) {
        const product = await this.productsRepo.create({
            name: attrs.name,
            descriptio: attrs.description,
            price: attrs.price,
            category_id: attrs.category_id
        })

        await this.redisService.publishProductCreated(product.toData())
    }
}