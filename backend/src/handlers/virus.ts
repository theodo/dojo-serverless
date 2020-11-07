import { APIGatewayProxyHandler } from 'aws-lambda';

import { success } from 'libs/response';
import { fetchViruses } from 'loaders/virus';

export const all: APIGatewayProxyHandler = async () => {
  return success(fetchViruses());
};
