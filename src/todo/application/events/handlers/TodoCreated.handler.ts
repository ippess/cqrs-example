import { EventHandler } from 'lib/cqrs/event/EventHandler.decorator';
import { TodoCreatedEvent } from 'src/todo/application/events/impl/TodoCreated.event';

@EventHandler(TodoCreatedEvent)
export class TodoCreatedHandler {
  handle(event: TodoCreatedEvent) {
    console.log(`Handled TodoCreatedEvent for ${event.todoId}`);
  }
}
