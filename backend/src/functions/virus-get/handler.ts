import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfyWithoutBodyParser } from '@libs/lambda';
import uuid from 'uuid';

const get: APIGatewayProxyHandler = async () => {
  const viruses = [
    { id: uuid() },
    { id: uuid() },
    { id: uuid() },
    { id: uuid() },
  ];
  return formatJSONResponse({ viruses });
}

export const main = middyfyWithoutBodyParser(get);