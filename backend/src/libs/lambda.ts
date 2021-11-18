import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { ValidatedEventAPIGatewayProxyHandler } from './apiGateway';

export const middyfy = <S>(handler: ValidatedEventAPIGatewayProxyHandler<S>) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(httpErrorHandler());
};
