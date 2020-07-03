import { APIGatewayProxyHandler } from 'aws-lambda';
import { VIRUS_STATUS } from 'src/models/virus';

export const main: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      data: {
        id: 1,
        status: VIRUS_STATUS.ALIVE,
      },
    }),
  };
};
