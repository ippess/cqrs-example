import { EventNames } from 'src/todo/application/events/EventNames';
import { TodoCreatedEvent } from 'src/todo/application/events/impl/TodoCreated.event';
import { TodoUpdatedEvent } from 'src/todo/application/events/impl/TodoUpdated.event';
import { TodoEvent } from 'src/todo/application/events';

export class TodoEventFactory {
  static fromRaw(raw: TodoEvent) {
    switch ((raw as any).type) {
      case EventNames.TodoCreatedEvent:
        return new TodoCreatedEvent(raw.todoId, raw.content);
      case EventNames.TodoUpdatedEvent:
        return new TodoUpdatedEvent(raw.todoId, raw.content);
      default:
        throw new Error(`Unknown event type: ${(raw as any).type}`);
    }
  }
}
