import { TodoRepository } from 'src/todo/application/ports/Todo.repository';
import { Todo } from 'src/todo/domain/Todo';

export class InMemoryTodoRepository implements TodoRepository {
  private readonly todos = new Map<string, Todo>();

  async save(todo: Todo): Promise<void> {
    this.todos.set(todo.id, todo);
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.get(id) ?? null;
  }

  async findAll(): Promise<Todo[]> {
    return Array.from(this.todos.values());
  }

  async delete(id: string): Promise<void> {
    this.todos.delete(id);
  }

  clear(): void {
    this.todos.clear();
  }
}
