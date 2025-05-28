import { v4 as uuidv4 } from 'uuid';

export type CommandMeta = {
  commandId?: string;
  timestamp?: Date;
  userId?: string;
  aggregateId?: string;
  correlationId?: string;
  source?: string;
};

export abstract class Command {
  readonly commandId: string;
  readonly timestamp: Date;
  readonly userId?: string;
  readonly aggregateId?: string;
  readonly correlationId?: string;
  readonly source?: string;

  constructor(meta: CommandMeta = {}) {
    this.commandId = meta.commandId ?? uuidv4();
    this.timestamp = meta.timestamp ?? new Date();
    this.userId = meta.userId;
    this.aggregateId = meta.aggregateId;
    this.correlationId = meta.correlationId;
    this.source = meta.source;
  }
}
