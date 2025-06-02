import { Injectable } from '@nestjs/common';
import { CommandHandler } from 'lib/cqrs/command/CommandHandler.decorator';
import { CommandHandler as ICommandHandler } from 'lib/cqrs/command/Command.handler';
import { CreateTodoCommand } from 'src/todo/application/command/impl/CreateTodo.command';
import { EventBus } from 'lib/cqrs/event/Event.bus';
import { Todo } from 'src/todo/domain/Todo';
import { EventStore } from 'lib/event-sroucing/application/port/EventStore';

@Injectable()
@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoCommand): Promise<void> {
    const todo = Todo.create({ content: command.content });

    const events = todo.pullEvents();

    await this.eventStore.appendEvents(todo.id, events, 0);

    for (const event of events) {
      this.eventBus.publish(event);
    }
  }
}
