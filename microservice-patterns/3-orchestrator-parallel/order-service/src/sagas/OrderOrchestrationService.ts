import { Injectable } from "@nestjs/common";
import { map, mergeMap, Observable, of, tap } from "rxjs";
import { ProductClient } from "src/clients/product.client";
import { OrchestrationRequestContext } from "src/dtos/OrchestrationRequestContext";
import { OrchestrationUtil } from "src/dtos/OrchestrationUtil";
import { OrderRequest } from "src/dtos/OrderRequest";
import { OrderResponse } from "src/dtos/OrderResponse";
import { Status } from "src/dtos/Status";
import { OrderCancellationService } from "./OrderCancellationService";
import { OrderFulfillmentService } from "./OrderFulfillmentService";

@Injectable()
export class OrderOrchestrationService {
    constructor(
        private readonly productClient: ProductClient,
        private readonly fulfillmentService: OrderFulfillmentService,
        private readonly cancellationService: OrderCancellationService,
    ) { }

    placeOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
        return of(orderRequest)
            .pipe(
                tap(console.log),
                mergeMap(orderRequest => this.productClient.getProduct(orderRequest.productId)),
                map(productResponse => OrchestrationRequestContext.build({ productPrice: productResponse.price, orderRequest })),
                tap(OrchestrationUtil.buildRequestContext),
                tap(console.log),
                mergeMap(this.fulfillmentService.placeOrder),
                tap(this.doOrderPostProcessing),
                map(this.toOrderResponse)
            )
    }

    toOrderResponse(ctx: OrchestrationRequestContext): OrderResponse {
        const address = ctx.status === Status.SUCCESS ? ctx.shippingResponse.address : null;
        const expectedDelivery = ctx.status === Status.SUCCESS ? ctx.shippingResponse.expectedDelivery : null;

        return OrderResponse.build({
            orderId: ctx.orderId,
            productId: ctx.orderRequest.productId,
            userId: ctx.orderRequest.userId,
            status: ctx.status,
            address,
            expectedDelivery
        })
    }

    doOrderPostProcessing(ctx: OrchestrationRequestContext) {
        if (ctx.status === Status.FAILED) {
            this.cancellationService.cancelOrder(ctx)
        }
    }
}