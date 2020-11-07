import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { success, failure } from 'libs/response';
import { fetchVirus, fetchViruses } from 'loaders/virus';

export const all: APIGatewayProxyHandler = async () => {
  return success(fetchViruses());
};

export const one: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return failure({ message: 'No id provided' });
  }

  const { id } = event.pathParameters;

  return success(fetchVirus(id));
};
