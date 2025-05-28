import { Injectable } from '@nestjs/common';
import { Command } from 'lib/cqrs/command/Command';
import { CommandHandler } from 'lib/cqrs/command/Command.handler';

@Injectable()
export class CommandBus {
  private handlers = new Map<string, CommandHandler<any>>();

  register<T extends Command>(
    commandType: new (...args: any[]) => T,
    handler: CommandHandler<T>,
  ) {
    this.handlers.set(commandType.name, handler);
  }

  async execute<T extends Command>(command: T): Promise<void> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler)
      throw new Error(`No handler found for ${command.constructor.name}`);
    await handler.execute(command);
  }
}
