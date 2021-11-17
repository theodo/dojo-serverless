import { success, failure } from '@libs/apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';

const kill: APIGatewayProxyHandler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return failure({ message: 'No id provided' });
  }

  const { id } = event.pathParameters;

  console.log('Virus killed');
  return success({ id });
}

export const main = middyfy(kill);