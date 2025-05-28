export class TodoDto {
  id: string;
  content: string;

  constructor(data: TodoDto) {
    this.id = data.id;
    this.content = data.content;
  }
}
