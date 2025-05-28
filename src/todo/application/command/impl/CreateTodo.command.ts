import { Command } from 'lib/cqrs/command/Command';

export class CreateTodoCommand extends Command {
  constructor(readonly content: string) {
    super();
  }
}
