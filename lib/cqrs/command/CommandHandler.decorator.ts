import { Command } from 'lib/cqrs/command/Command';
import 'reflect-metadata';

export const COMMAND_HANDLER_METADATA = 'COMMAND_HANDLER_METADATA';

export function CommandHandler<T extends Command>(
  commandType: new (...args: any[]) => T,
): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, commandType, target);
  };
}
