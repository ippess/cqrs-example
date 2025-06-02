import { QueryHandler } from 'lib/cqrs/query/QueryHandler.decorator';
import { QueryHandler as IQueryHandler } from 'lib/cqrs/query/Query.handler';
import { GetTodoByIdQuery } from 'src/todo/application/query/impl/GetTodoById.query';
import { Injectable } from '@nestjs/common';
import { Todo } from 'src/todo/domain/Todo';
import { EventStore } from 'lib/event-sroucing/application/port/EventStore';
import { TodoEventFactory } from 'src/todo/application/events/EventFactory';

@Injectable()
@QueryHandler(GetTodoByIdQuery)
export class GetTodoByIdHandler
  implements IQueryHandler<GetTodoByIdQuery, any>
{
  constructor(private readonly eventStore: EventStore) {}

  async execute(query: GetTodoByIdQuery) {
    const events = await this.eventStore.loadEvents(query.id);
    const todoEvents = events.map(TodoEventFactory.fromRaw);

    return Todo.rebuildFrom(todoEvents);
  }
}
