import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map, catchError, of } from 'rxjs';
import { InventoryRequest } from 'src/dtos/InventoryRequest';
import { Status } from 'src/dtos/Status';
import { callService, ServiceCallActions, ServiceCallNames } from './util';
import { InventoryResponse } from 'src/dtos/InventoryResponse';

@Injectable()
export class InventoryClient {
    baseUrl: string;

    constructor(
        private readonly http: HttpService
    ) {
        this.baseUrl = 'http://localhost:5000/inventory'
    }

    deduct(inventoryRequest: InventoryRequest): Observable<InventoryResponse> {
        return callService(ServiceCallNames.inventory, ServiceCallActions.deductInventory, inventoryRequest)
            .pipe(
                map(x => InventoryResponse.build(x)),
                catchError(_ => this._buildErrorResponse(inventoryRequest))
            )
    }

    restore(inventoryRequest: InventoryRequest): Observable<InventoryResponse> {
        return callService(ServiceCallNames.inventory, ServiceCallActions.restoreInventory, inventoryRequest)
            .pipe(
                map(x => InventoryResponse.build(x)),
                catchError(_ => this._buildErrorResponse(inventoryRequest))
            )
    }

    private _buildErrorResponse(inventoryRequest: InventoryRequest) {
        return of(InventoryResponse.build({
            status: Status.FAILED,
            productId: inventoryRequest.productId,
            quantity: inventoryRequest.quantity,
            remainingQuantity: -1
        }))
    }
}