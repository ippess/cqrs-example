import { SetMetadata } from '@nestjs/common';

export const QUERY_HANDLER_METADATA = 'QUERY_HANDLER_METADATA';

export function QueryHandler(
  queryType: new (...args: any[]) => any,
): ClassDecorator {
  return SetMetadata(QUERY_HANDLER_METADATA, queryType);
}
