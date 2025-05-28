import { EventHandler } from 'lib/cqrs/event/EventHandler.decorator';
import { TodoUpdatedEvent } from 'src/todo/application/events/impl/TodoUpdated.event';

@EventHandler(TodoUpdatedEvent)
export class TodoUpdatedHandler {
  handle(event: TodoUpdatedEvent) {
    console.log(`Handled TodoUpdatedEvent for ${event.todoId}`);
  }
}
