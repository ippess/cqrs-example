import { Query } from 'lib/cqrs/query/Query';

export class GetTodoByIdQuery extends Query {
  constructor(public readonly id: string) {
    super();
  }
}
