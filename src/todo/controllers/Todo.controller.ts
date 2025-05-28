import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'lib/cqrs/command/Command.bus';
import { QueryBus } from 'lib/cqrs/query/Query.bus';
import { CreateTodoCommand } from 'src/todo/application/command/impl/CreateTodo.command';
import { UpdateTodoCommand } from 'src/todo/application/command/impl/UpdateTodo.command';
import { GetTodoByIdQuery } from 'src/todo/application/query/impl/GetTodoById.query';
import { CreateTodoDto } from 'src/todo/controllers/dto/request/CreateTodo.dto';
import { UpdateTodoDto } from 'src/todo/controllers/dto/request/UpdateTodo.dto';
import { TodoDto } from 'src/todo/controllers/dto/response/Todo.dto';
import { Todo } from 'src/todo/domain/Todo';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateTodoDto): Promise<void> {
    const command = new CreateTodoCommand(dto.content);
    await this.commandBus.execute(command);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<TodoDto> {
    const todo = await this.queryBus.execute<GetTodoByIdQuery, Todo>(
      new GetTodoByIdQuery(id),
    );
    return new TodoDto(todo);
  }

  @Patch(':id')
  async updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const command = new UpdateTodoCommand(id, dto.content);
    await this.commandBus.execute(command);
  }
}
