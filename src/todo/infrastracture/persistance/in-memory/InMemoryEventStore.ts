import { Event } from 'lib/cqrs/event/Event';
import { EventStore } from 'lib/event-sroucing/application/port/EventStore';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryEventStore implements EventStore {
  private events: Map<string, Event[]> = new Map();

  async appendEvents(
    aggregateId: string,
    events: Event[],
    expectedVersion: number,
  ): Promise<void> {
    const existingEvents = this.events.get(aggregateId) || [];

    if (existingEvents.length !== expectedVersion) {
      throw new Error(
        `Concurrency exception: expected version ${expectedVersion}, got ${existingEvents.length}`,
      );
    }

    const newEvents = events.map((event, index) => {
      return {
        ...event,
        version: expectedVersion + index + 1,
        timestamp: new Date(),
      } as Event;
    });

    this.events.set(aggregateId, [...existingEvents, ...newEvents]);
  }

  async loadEvents(aggregateId: string): Promise<Event[]> {
    return this.events.get(aggregateId) || [];
  }

  allEvents(): Event[] {
    return Array.from(this.events.values()).flat();
  }
}
