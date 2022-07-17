import { Subjects, Publisher, OrderCancelledEvent } from '@kidsorg/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
