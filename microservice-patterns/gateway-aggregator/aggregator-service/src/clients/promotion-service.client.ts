import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, catchError, of } from 'rxjs';
import { GetPromotionsDto } from 'src/dtos/get-promotions.dto';

@Injectable()
export class PromotionServiceClient {
    baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:3001/promotions'
    }

    getActivePromotions(): Observable<GetPromotionsDto> {
        return this.http.get(`${this.baseUrl}`)
            .pipe(
                catchError(err => of({ data: { data: [] } })),
                map(res => res.data?.data)
            )
    }
}