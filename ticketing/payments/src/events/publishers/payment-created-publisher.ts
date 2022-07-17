import { Subjects, Publisher, PaymentCreatedEvent } from '@kidsorg/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
