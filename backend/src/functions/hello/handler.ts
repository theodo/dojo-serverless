import type { ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfyWithBodyParser } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfyWithBodyParser<typeof schema>(hello);