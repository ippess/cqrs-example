import { Event } from 'lib/cqrs/event/Event';
import { EventNames } from 'src/todo/application/events/EventNames';

export class TodoCreatedEvent extends Event {
  public readonly type = EventNames.TodoCreatedEvent;

  constructor(
    public readonly todoId: string,
    public readonly content: string,
  ) {
    super();
  }
}
