import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map, catchError, of } from 'rxjs';
import { PaymentRequest } from 'src/dtos/PaymentRequest';
import { PaymentResponse } from 'src/dtos/PaymentResponse';
import { Status } from 'src/dtos/Status';
import { callService, ServiceCallActions, ServiceCallNames } from './util';

@Injectable()
export class UserClient {
    baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:4000/users'
    }

    createPayment(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
        return callService(ServiceCallNames.user, ServiceCallActions.deductAccount, paymentRequest)
            .pipe(
                map(x => PaymentResponse.build(x)),
                catchError(_ => this._buildErrorResponse())
            )
    }

    refundPayment(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
        return callService(ServiceCallNames.user, ServiceCallActions.refundAccount, paymentRequest)
            .pipe(
                map(x => PaymentResponse.build(x)),
                catchError(_ => this._buildErrorResponse())
            )
    }

    private _buildErrorResponse() {
        return of(PaymentResponse.build({
            balance: -1,
            name: '',
            status: Status.FAILED,
            userId: -1
        }))
    }
}