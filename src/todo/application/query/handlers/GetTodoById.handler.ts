import { QueryHandler } from 'lib/cqrs/query/QueryHandler.decorator';
import { QueryHandler as IQueryHandler } from 'lib/cqrs/query/Query.handler';
import { TodoRepository } from 'src/todo/application/ports/Todo.repository';
import { GetTodoByIdQuery } from 'src/todo/application/query/impl/GetTodoById.query';
import { Injectable } from '@nestjs/common';

@Injectable()
@QueryHandler(GetTodoByIdQuery)
export class GetTodoByIdHandler
  implements IQueryHandler<GetTodoByIdQuery, any>
{
  constructor(private readonly todoRepo: TodoRepository) {}

  async execute(query: GetTodoByIdQuery) {
    return await this.todoRepo.findById(query.id);
  }
}
