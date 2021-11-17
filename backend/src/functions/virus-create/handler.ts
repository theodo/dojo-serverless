import { success } from '@libs/apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import uuid from 'uuid';

const kill: APIGatewayProxyHandler = async () => {
  const id = uuid();
  console.log('Virus created');
  return success({ id });
}

export const main = middyfy(kill);