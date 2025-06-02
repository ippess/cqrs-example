import { v4 as uuidv4 } from 'uuid';

export type EventMeta = {
  type?: string;
  eventId?: string;
  occurredAt?: Date;
  aggregateId?: string;
  correlationId?: string;
  causationId?: string;
  version?: number;
  source?: string;
};

export abstract class Event {
  readonly type: string;
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly aggregateId?: string;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly version?: number;
  readonly source?: string;

  constructor(meta: EventMeta = {}) {
    this.type = meta.type;
    this.eventId = meta.eventId ?? uuidv4();
    this.occurredAt = meta.occurredAt ?? new Date();
    this.aggregateId = meta.aggregateId;
    this.correlationId = meta.correlationId;
    this.causationId = meta.causationId;
    this.version = meta.version;
    this.source = meta.source;
  }
}
