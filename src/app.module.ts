import { Module } from '@nestjs/common';
import { CqrsModule } from 'lib/cqrs/cqrs.module';
import { EventStore } from 'lib/event-sroucing/application/port/EventStore';
import { CreateTodoHandler } from 'src/todo/application/command/handlers/CreateTodo.handler';
import { UpdateTodoHandler } from 'src/todo/application/command/handlers/UpdateTodo.handler';
import { TodoCreatedHandler } from 'src/todo/application/events/handlers/TodoCreated.handler';
import { TodoUpdatedHandler } from 'src/todo/application/events/handlers/TodoUpdated.handler';
import { GetTodoByIdHandler } from 'src/todo/application/query/handlers/GetTodoById.handler';
import { TodoController } from 'src/todo/controllers/Todo.controller';
import { InMemoryEventStore } from 'src/todo/infrastracture/persistance/in-memory/InMemoryEventStore';

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

    { provide: EventStore, useClass: InMemoryEventStore },
  ],
})
export class AppModule {}
