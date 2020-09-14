import { APIGatewayProxyHandler } from 'aws-lambda';
import uuid from 'uuid';

import { success } from '@libs/response';

export const main: APIGatewayProxyHandler = async () => {
  const viruses = [
    { id: uuid() },
    { id: uuid() },
    { id: uuid() },
    { id: uuid() },
  ];

  return success({ viruses });
};
