import { TodoCreatedEvent } from 'src/todo/application/events/impl/TodoCreated.event';
import { TodoUpdatedEvent } from 'src/todo/application/events/impl/TodoUpdated.event';

export type TodoEvent = TodoCreatedEvent | TodoUpdatedEvent;
