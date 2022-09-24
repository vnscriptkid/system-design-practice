import { InventoryRequest } from "./InventoryRequest";
import { OrchestrationRequestContext } from "./OrchestrationRequestContext";
import { PaymentRequest } from "./PaymentRequest";
import { ShippingRequest } from "./ShippingRequest";

export class OrchestrationUtil {
    public static buildRequestContext(ctx: OrchestrationRequestContext) {
        OrchestrationUtil.buildPaymentRequest(ctx)
        OrchestrationUtil.buildInventoryRequest(ctx)
        OrchestrationUtil.buildShippingRequest(ctx)
    }

    static buildShippingRequest(ctx: OrchestrationRequestContext) {
        const shippingRequest = ShippingRequest.build({
            userId: ctx.orderRequest.userId,
            orderId: ctx.orderId
        })

        ctx.shippingRequest = shippingRequest;
    }

    static buildInventoryRequest(ctx: OrchestrationRequestContext) {
        const inventoryRequest = InventoryRequest.build({
            userId: ctx.orderRequest.userId,
            productId: ctx.orderRequest.productId,
            quantity: ctx.orderRequest.quantity,
        })

        ctx.inventoryRequest = inventoryRequest;
    }

    static buildPaymentRequest(ctx: OrchestrationRequestContext) {
        const paymentRequest = PaymentRequest.build({
            userId: ctx.orderRequest.userId,
            orderId: ctx.orderId,
            amount: ctx.productPrice * ctx.orderRequest.quantity
        })

        ctx.paymentRequest = paymentRequest;
    }
}