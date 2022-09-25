import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, catchError, EMPTY } from 'rxjs';
import { GetProductDto } from 'src/dtos/get-product.dto';

@Injectable()
export class ProductServiceClient {
    baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:3003/products'
    }

    getProduct(productId: number): Observable<GetProductDto> {
        return this.http.get(`${this.baseUrl}/${productId}`)
            .pipe(
                map(res => res.data?.data),
                catchError(err => EMPTY)
            )
    }
}