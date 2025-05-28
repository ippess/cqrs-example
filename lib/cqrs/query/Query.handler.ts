import { Query } from 'lib/cqrs/query/Query';

export interface QueryHandler<T extends Query, R> {
  execute(query: T): Promise<R>;
}
