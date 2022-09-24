import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map, catchError, of } from 'rxjs';
import { ShippingRequest } from 'src/dtos/ShippingRequest';
import { ShippingResponse } from 'src/dtos/ShippingResponse';
import { Status } from 'src/dtos/Status';
import { callService, ServiceCallActions, ServiceCallNames } from './util';

@Injectable()
export class ShippingClient {
    baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:6000/shipping'
    }

    schedule(shippingRequest: ShippingRequest): Observable<ShippingResponse> {
        return callService(ServiceCallNames.shipping, ServiceCallActions.scheduleShipping, shippingRequest)
            .pipe(
                map(x => ShippingResponse.build(x)),
                catchError(_ => this._buildErrorResponse(shippingRequest))
            )
    }

    cancel(shippingRequest: ShippingRequest): Observable<ShippingResponse> {
        return callService(ServiceCallNames.shipping, ServiceCallActions.cancelShipping, shippingRequest)
            .pipe(
                map(x => ShippingResponse.build(x)),
                catchError(_ => this._buildErrorResponse(shippingRequest))
            )
    }

    private _buildErrorResponse(shippingRequest: ShippingRequest) {
        return of(ShippingResponse.build({
            status: Status.FAILED,
            orderId: -1,
            expectedDelivery: null,
            address: null
        }))
    }
}