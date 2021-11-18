import { success } from '@libs/apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';

const kill: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  console.log('Virus killed');
  return success({ id });
}

export const main = middyfy(kill);