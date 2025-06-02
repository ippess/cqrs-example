import { Event } from 'lib/cqrs/event/Event';

export abstract class EventStore {
  abstract appendEvents(
    aggregateId: string,
    events: Event[],
    expectedVersion: number,
  ): Promise<void>;
  abstract loadEvents(aggregateId: string): Promise<Event[]>;
  allEvents?(): Event[];
}
