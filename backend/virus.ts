import { success } from '@libs/response';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { fetchViruses } from './src/loaders/virus';

export const all: APIGatewayProxyHandler = async () => {
  return success(fetchViruses());
};
