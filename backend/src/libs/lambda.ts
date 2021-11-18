import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { ValidatedEventAPIGatewayProxyHandler, IdParamRequiredEventAPIGatewayProxyHandler } from './apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const middyfyWithBodyParser = <S>(handler: ValidatedEventAPIGatewayProxyHandler<S>) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(httpErrorHandler());
};

export const middyfyWithoutBodyParser = (handler: APIGatewayProxyHandler | IdParamRequiredEventAPIGatewayProxyHandler) => {
  return middy(handler)
    .use(httpErrorHandler());
};