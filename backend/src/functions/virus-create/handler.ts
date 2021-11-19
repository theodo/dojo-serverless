import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfyWithoutBodyParser } from '@libs/lambda';
import uuid from 'uuid';

const create: APIGatewayProxyHandler = async () => {
  const id = uuid();
  console.log('Virus created');
  return formatJSONResponse({ id });
}

export const main = middyfyWithoutBodyParser(create);