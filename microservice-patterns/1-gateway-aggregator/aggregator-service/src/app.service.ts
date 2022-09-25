import { Injectable, NotFoundException } from '@nestjs/common';
import { map, zip, Observable, catchError, throwIfEmpty, onErrorResumeNext } from 'rxjs';
import { ProductServiceClient } from './clients/product-service.client';
import { PromotionServiceClient } from './clients/promotion-service.client';
import { ReviewServiceClient } from './clients/review-service.client';
import { AggregateProductDto } from './dtos/aggregate-product.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly productServiceClient: ProductServiceClient,
    private readonly reviewServiceClient: ReviewServiceClient,
    private readonly promotionServiceClient: PromotionServiceClient,
  ) { }

  aggregateProduct(productId: number): Observable<AggregateProductDto> {
    return zip(
      this.productServiceClient.getProduct(productId),
      this.promotionServiceClient.getActivePromotions(),
      this.reviewServiceClient.getProductReviews(productId)
    ).pipe(
      throwIfEmpty(() => new NotFoundException()),
      map(([product, promotions, reviews]) => {

        const totalDiscount = promotions.reduce((a, b) => a + b.discount, 0);
        const amountSaved = product.price * totalDiscount / 100;

        return {
          ...product,
          price: {
            listPrice: product.price,
            discount: totalDiscount,
            discountedPrice: product.price - amountSaved,
            amountSaved,
          },
          reviews
        }
      })
    )
  }
}
