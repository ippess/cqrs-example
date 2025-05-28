import { EventHandler } from 'lib/cqrs/event/Event.handler';
import { Event } from 'lib/cqrs/event/Event';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventBus {
  private handlers = new Map<string, EventHandler<any>[]>();

  register<T extends Event>(
    eventType: new (...args: any[]) => T,
    handler: EventHandler<T>,
  ) {
    const name = eventType.name;
    if (!this.handlers.has(name)) {
      this.handlers.set(name, []);
    }
    this.handlers.get(name)!.push(handler);
  }

  async publish<T extends Event>(event: T): Promise<void> {
    const handlers = this.handlers.get(event.constructor.name) || [];
    for (const handler of handlers) {
      await handler.handle(event);
    }
  }
}
