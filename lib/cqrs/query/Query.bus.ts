import { Query } from 'lib/cqrs/query/Query';
import { QueryHandler } from 'lib/cqrs/query/Query.handler';

export class QueryBus {
  private handlers = new Map<string, QueryHandler<any, any>>();

  register<T extends Query, R>(
    queryType: new (...args: any[]) => T,
    handler: QueryHandler<T, R>,
  ) {
    this.handlers.set(queryType.name, handler);
  }

  async execute<T extends Query, R>(query: T): Promise<R> {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler)
      throw new Error(`No handler found for ${query.constructor.name}`);
    return handler.execute(query);
  }
}
