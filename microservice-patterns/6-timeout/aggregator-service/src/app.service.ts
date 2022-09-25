import { Injectable, NotFoundException } from '@nestjs/common';
import { map, zip, Observable, throwIfEmpty } from 'rxjs';
import { ProductServiceClient } from './clients/product-service.client';
import { ReviewServiceClient } from './clients/review-service.client';
import { AggregateProductDto } from './dtos/aggregate-product.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly productServiceClient: ProductServiceClient,
    private readonly reviewServiceClient: ReviewServiceClient,
  ) { }

  aggregateProduct(productId: number): Observable<AggregateProductDto> {
    return zip(
      this.productServiceClient.getProduct(productId),
      this.reviewServiceClient.getProductReviews(productId)
    ).pipe(
      throwIfEmpty(() => new NotFoundException()),
      map(([product, reviews]) => {

        return {
          ...product,
          reviews
        }
      })
    )
  }
}
