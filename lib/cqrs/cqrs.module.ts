import { Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService, Reflector } from '@nestjs/core';
import { CommandBus } from './command/Command.bus';
import { EventBus } from './event/Event.bus';
import { COMMAND_HANDLER_METADATA } from './command/CommandHandler.decorator';
import { EVENT_HANDLER_METADATA } from './event/EventHandler.decorator';
import { QUERY_HANDLER_METADATA } from 'lib/cqrs/query/QueryHandler.decorator';
import { QueryBus } from 'lib/cqrs/query/Query.bus';

@Module({
  imports: [DiscoveryModule],
  providers: [CommandBus, EventBus, QueryBus],
  exports: [CommandBus, EventBus, QueryBus],
})
export class CqrsModule implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}

  onModuleInit() {
    const providers = this.discovery.getProviders();

    for (const provider of providers) {
      if (!provider.instance) continue;

      const commandType = this.reflector.get(
        COMMAND_HANDLER_METADATA,
        provider.instance.constructor,
      );
      if (commandType) {
        this.commandBus.register(commandType, provider.instance);
      }

      const eventType = this.reflector.get(
        EVENT_HANDLER_METADATA,
        provider.instance.constructor,
      );
      if (eventType) {
        this.eventBus.register(eventType, provider.instance);
      }

      const queryType = this.reflector.get(
        QUERY_HANDLER_METADATA,
        provider.instance.constructor,
      );
      if (queryType) {
        this.queryBus.register(queryType, provider.instance);
      }
    }
  }
}
