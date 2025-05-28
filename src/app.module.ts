import { Module } from '@nestjs/common';
import { CqrsModule } from 'lib/cqrs/cqrs.module';
import { CreateTodoHandler } from 'src/todo/application/command/handlers/CreateTodo.handler';
import { UpdateTodoHandler } from 'src/todo/application/command/handlers/UpdateTodo.handler';
import { TodoCreatedHandler } from 'src/todo/application/events/handlers/TodoCreated.handler';
import { TodoUpdatedHandler } from 'src/todo/application/events/handlers/TodoUpdated.handler';
import { TodoRepository } from 'src/todo/application/ports/Todo.repository';
import { GetTodoByIdHandler } from 'src/todo/application/query/handlers/GetTodoById.handler';
import { TodoController } from 'src/todo/controllers/Todo.controller';
import { InMemoryTodoRepository } from 'src/todo/infrastracture/persistance/in-memory/InMemoryTodo.repository';

const COMMANDS = [CreateTodoHandler, UpdateTodoHandler];
const EVENTS = [TodoCreatedHandler, TodoUpdatedHandler];
const QUERIES = [GetTodoByIdHandler];

@Module({
  imports: [CqrsModule],
  controllers: [TodoController],
  providers: [
    ...COMMANDS,
    ...EVENTS,
    ...QUERIES,

    { provide: TodoRepository, useClass: InMemoryTodoRepository },
  ],
})
export class AppModule {}
