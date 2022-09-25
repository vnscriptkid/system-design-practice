import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, catchError, of, timeout, TimeoutError } from 'rxjs';
import { GetReviewsDto } from 'src/dtos/get-reviews.dto';

@Injectable()
export class ReviewServiceClient {
    baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:3002/reviews'
    }

    getProductReviews(productId: number): Observable<GetReviewsDto> {
        return this.http.get(`${this.baseUrl}?productId=${productId}`)
            .pipe(
                timeout(500),
                catchError(err => {
                    if (err instanceof TimeoutError) {
                        console.info(`[getProductReviews] timeout`)
                    }

                    return of({ data: { data: [] } })
                }),
                map(res => res.data?.data)
            )

    }
}