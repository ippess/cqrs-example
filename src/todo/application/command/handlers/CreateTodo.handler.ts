import { Injectable } from '@nestjs/common';
import { CommandHandler } from 'lib/cqrs/command/CommandHandler.decorator';
import { CommandHandler as ICommandHandler } from 'lib/cqrs/command/Command.handler';
import { CreateTodoCommand } from 'src/todo/application/command/impl/CreateTodo.command';
import { EventBus } from 'lib/cqrs/event/Event.bus';
import { TodoRepository } from 'src/todo/application/ports/Todo.repository';
import { Todo } from 'src/todo/domain/Todo';
import { TodoCreatedEvent } from 'src/todo/application/events/impl/TodoCreated.event';

@Injectable()
@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoCommand): Promise<void> {
    const todo = Todo.create({ content: command.content });

    await this.todoRepository.save(todo);

    this.eventBus.publish(new TodoCreatedEvent(todo.id, todo.content));
  }
}
