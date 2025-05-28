import { v4 } from 'uuid';

type TodoData = {
  id: string;
  content: string;
};

type TodoCreateData = {
  content: string;
};

type TodoUpdateData = {
  content?: string;
};

export class Todo implements TodoData {
  id: string;
  content: string;

  constructor(data: TodoData) {
    this.id = data.id;
    this.content = data.content;
  }

  static create(data: TodoCreateData) {
    return new Todo({ id: v4(), content: data.content });
  }

  update(data: TodoUpdateData) {
    this.content = data.content ?? this.content;
  }
}
