import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler } from 'lib/cqrs/command/CommandHandler.decorator';
import { CommandHandler as ICommandHandler } from 'lib/cqrs/command/Command.handler';
import { EventBus } from 'lib/cqrs/event/Event.bus';
import { UpdateTodoCommand } from 'src/todo/application/command/impl/UpdateTodo.command';
import { Todo } from 'src/todo/domain/Todo';
import { EventStore } from 'lib/event-sroucing/application/port/EventStore';
import { TodoEventFactory } from 'src/todo/application/events/EventFactory';

@Injectable()
@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateTodoCommand): Promise<void> {
    const todo = await this.loadAggregate(command.id);

    todo.update({ content: command.content });

    await this.commit(todo);
  }

  private async loadAggregate(id: string): Promise<Todo> {
    const events = await this.eventStore.loadEvents(id);
    if (events.length === 0)
      throw new NotFoundException(`Todo with ID ${id} not found.`);

    const todoEvents = events.map(TodoEventFactory.fromRaw);

    return Todo.rebuildFrom(todoEvents);
  }

  private async commit(aggregate: Todo): Promise<void> {
    const newEvents = aggregate.pullEvents();
    await this.eventStore.appendEvents(
      aggregate.id,
      newEvents,
      aggregate.getVersion() - newEvents.length,
    );
    for (const event of newEvents) {
      this.eventBus.publish(event);
    }
  }
}
