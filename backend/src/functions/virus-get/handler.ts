import { success } from '@libs/apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import uuid from 'uuid';

const get: APIGatewayProxyHandler = async () => {
  const viruses = [
    { id: uuid() },
    { id: uuid() },
    { id: uuid() },
    { id: uuid() },
  ];
  return success({ viruses });
}

export const main = middyfy(get);