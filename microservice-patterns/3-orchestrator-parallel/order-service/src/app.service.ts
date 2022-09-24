import { Injectable, NotFoundException } from '@nestjs/common';
import { map, zip, Observable, throwIfEmpty } from 'rxjs';
import { ProductClient } from './clients/product.client';
import { UserClient } from './clients/user.client';
import { OrderRequest } from './dtos/OrderRequest';
import { PaymentRequest } from './dtos/PaymentRequest';
import { OrderOrchestrationService } from './sagas/OrderOrchestrationService';

@Injectable()
export class AppService {
  constructor(
    private readonly productClient: ProductClient,
    private readonly userClient: UserClient,
    private readonly orderOrchestrationService: OrderOrchestrationService
  ) { }

  placeOrder(orderRequest: OrderRequest) {
    return this.orderOrchestrationService.placeOrder(orderRequest);
  }

  getProduct(productId: number) {
    return this.productClient.getProduct(productId);
  }

  createPayment(paymentRequest: PaymentRequest) {
    this.userClient.createPayment(paymentRequest)
  }

  refundPayment(paymentRequest: PaymentRequest) {
    this.userClient.refundPayment(paymentRequest)
  }
}
