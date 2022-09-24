import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ProductResponse } from 'src/dtos/ProductResponse';
import { callService, ServiceCallActions, ServiceCallNames } from './util';

@Injectable()
export class ProductClient {
    baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:3003/products'
    }

    getProduct(productId: number): Observable<ProductResponse> {
        return callService(ServiceCallNames.product, ServiceCallActions.getProduct, { productId })
            .pipe(
                map(x => ProductResponse.build(x))
            )
    }
}