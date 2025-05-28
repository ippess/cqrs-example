import { Command } from 'lib/cqrs/command/Command';

export class UpdateTodoCommand extends Command {
  constructor(
    readonly id: string,
    readonly content: string,
  ) {
    super();
  }
}
