import { Publisher, OrderCreatedEvent, Subjects } from '@kidsorg/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
