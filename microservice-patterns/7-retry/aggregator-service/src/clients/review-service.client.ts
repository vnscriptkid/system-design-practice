import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, catchError, of, timeout, TimeoutError, retry, tap, EMPTY } from 'rxjs';
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
        console.log('=== start')
        return this.http.get(`${this.baseUrl}?productId=${productId}`)
            .pipe(
                tap((x) => console.log(`>> getProductReviews`)),
                catchError((err) => {
                    const statusCode = err?.response?.status;

                    if (typeof statusCode === 'number' && statusCode >= 400 && statusCode <= 499) {
                        console.info(`[getProductReviews] client error. no need to retry`)
                        return EMPTY;
                    }

                    console.log('[getProductReviews] err will retry: ', err?.response?.status, err?.message)
                }),
                retry(3),
                timeout(500),
                // catchErr here will be executed after 3 retries or timeout hits
                catchError(err => of({ data: { data: [] } })),
                map(res => res.data?.data)
            )

    }
}