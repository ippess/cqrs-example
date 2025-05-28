import { Injectable } from '@nestjs/common';
import { CommandHandler } from 'lib/cqrs/command/CommandHandler.decorator';
import { CommandHandler as ICommandHandler } from 'lib/cqrs/command/Command.handler';
import { EventBus } from 'lib/cqrs/event/Event.bus';
import { TodoRepository } from 'src/todo/application/ports/Todo.repository';
import { UpdateTodoCommand } from 'src/todo/application/command/impl/UpdateTodo.command';
import { TodoUpdatedEvent } from 'src/todo/application/events/impl/TodoUpdated.event';

@Injectable()
@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateTodoCommand): Promise<void> {
    const todo = await this.todoRepository.findById(command.id);

    todo.update({
      content: command.content,
    });

    await this.todoRepository.save(todo);

    this.eventBus.publish(new TodoUpdatedEvent(todo.id, todo.content));
  }
}
