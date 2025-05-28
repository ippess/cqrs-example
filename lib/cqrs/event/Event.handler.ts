import { Event } from 'lib/cqrs/event/Event';

export interface EventHandler<T extends Event> {
  handle(event: T): Promise<void>;
}
