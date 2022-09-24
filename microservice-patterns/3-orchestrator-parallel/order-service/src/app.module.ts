import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductClient } from './clients/product.client';
import { UserClient } from './clients/user.client';
import { OrderOrchestrationService } from './sagas/OrderOrchestrationService';
import { OrderFulfillmentService } from './sagas/OrderFulfillmentService';
import { OrderCancellationService } from './sagas/OrderCancellationService';
import { InventoryOrchestrator } from './sagas/InventoryOrchestrator';
import { PaymentOrchestrator } from './sagas/PaymentOrchestrator';
import { ShippingOrchestrator } from './sagas/ShippingOrchestrator';
import { InventoryClient } from './clients/inventory.client';
import { ShippingClient } from './clients/shipping.client';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    PaymentOrchestrator,
    ShippingOrchestrator,
    InventoryOrchestrator,
    {
      provide: 'Orchestrators',
      useFactory: (payment, shipping, inventory) => [payment, shipping, inventory],
      inject: [PaymentOrchestrator, ShippingOrchestrator, InventoryOrchestrator]
    },
    OrderFulfillmentService,
    OrderCancellationService,
    ProductClient,
    UserClient,
    ShippingClient,
    InventoryClient,
    OrderOrchestrationService,
    AppService,
  ],
})
export class AppModule { }
