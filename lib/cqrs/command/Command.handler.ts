import { Command } from 'lib/cqrs/command/Command';

export interface CommandHandler<T extends Command> {
  execute(command: T): Promise<void>;
}
