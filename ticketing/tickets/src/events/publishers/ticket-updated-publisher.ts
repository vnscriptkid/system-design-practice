import { Publisher, Subjects, TicketUpdatedEvent } from '@kidsorg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
