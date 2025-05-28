import { SetMetadata } from '@nestjs/common';

export const EVENT_HANDLER_METADATA = 'EVENT_HANDLER_METADATA';

export const EventHandler = (
  event: new (...args: any[]) => any,
): ClassDecorator => SetMetadata(EVENT_HANDLER_METADATA, event);
