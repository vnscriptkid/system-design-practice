import { ProductData } from "@kidsorg/amazon-common";
import { Inject, NotFoundException } from "@nestjs/common";
import { col, fn } from "sequelize";
import { ProductRating } from "src/models/product-ratings";
import { Product } from "src/models/product.entity";
import { RateProductRequest } from "src/requests/rate-product.request";

export class RateProductAction {
    constructor(
        @Inject('PRODUCTS_REPOSITORY') private readonly productsRepo: typeof Product,
        @Inject('PRODUCT_RATINGS_REPOSITORY') private readonly ratingsRepo: typeof ProductRating,
    ) { }

    public async execute(req: RateProductRequest) {
        await this.productsRepo.sequelize.transaction(async (transaction) => {
            const product = await this.productsRepo.findByPk(req.product_id);

            if (!product) {
                throw new NotFoundException('Product not found')
            }

            const rating = await this.ratingsRepo.create({
                product_id: req.product_id,
                comment: req.comment,
                rating: req.rating
            })

            const [{ average_rating }] = await this.ratingsRepo.findAll<any>({
                where: { product_id: product.id },
                attributes: [[fn('avg', col('rating')), 'average_rating']],
                raw: true
            })

            await product.update({
                average_rating
            })
        })
    }
}