import { Publisher, Subjects, TicketCreatedEvent } from '@kidsorg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
