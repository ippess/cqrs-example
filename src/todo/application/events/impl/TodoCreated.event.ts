import { Event } from 'lib/cqrs/event/Event';

export class TodoCreatedEvent extends Event {
  constructor(
    public readonly todoId: string,
    public readonly content: string,
  ) {
    super();
  }
}
