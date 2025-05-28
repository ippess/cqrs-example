import { Todo } from 'src/todo/domain/Todo';

export abstract class TodoRepository {
  abstract save(todo: Todo): Promise<void>;
  abstract findById(id: string): Promise<Todo | null>;
  abstract findAll(): Promise<Todo[]>;
  abstract delete(id: string): Promise<void>;
}
