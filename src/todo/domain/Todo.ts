import { EventSourceable } from 'lib/event-sroucing/domain/EventSourcable';
import { TodoEvent } from 'src/todo/application/events';
import { TodoCreatedEvent } from 'src/todo/application/events/impl/TodoCreated.event';
import { TodoUpdatedEvent } from 'src/todo/application/events/impl/TodoUpdated.event';
import { v4 } from 'uuid';

type TodoData = {
  id: string;
  content: string;
};

type TodoCreateData = {
  content: string;
};

type TodoUpdateData = {
  content?: string;
};

export class Todo extends EventSourceable<TodoEvent> {
  id: string;
  content: string;

  constructor(events: TodoEvent[] = []) {
    super(events);
  }

  static create(data: TodoCreateData): Todo {
    const todo = new Todo();
    todo.emit(new TodoCreatedEvent(v4(), data.content));
    return todo;
  }

  update(data: TodoUpdateData): void {
    const newContent = data.content ?? this.content;
    if (newContent !== this.content) {
      this.emit(new TodoUpdatedEvent(this.id, newContent));
    }
  }

  protected apply(event: TodoEvent): void {
    if (event instanceof TodoCreatedEvent) {
      this.id = event.todoId;
      this.content = event.content;
    } else if (event instanceof TodoUpdatedEvent) {
      this.content = event.content;
    }
  }

  static rebuildFrom(events: TodoEvent[]): Todo {
    return new Todo(events);
  }

  getState(): TodoData {
    return {
      id: this.id,
      content: this.content,
    };
  }
}
