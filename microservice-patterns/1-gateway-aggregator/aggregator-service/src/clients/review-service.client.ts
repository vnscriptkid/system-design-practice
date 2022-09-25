import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, catchError, of } from 'rxjs';
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
                catchError(err => of({ data: { data: [] } })),
                map(res => res.data?.data)
            )

    }
}