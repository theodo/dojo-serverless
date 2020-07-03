import { APIGatewayProxyHandler } from 'aws-lambda';
import { VIRUS_STATUS } from 'src/models/virus';
import { success } from '@libs/response';

export const main: APIGatewayProxyHandler = async () => {
  return success({
    data: [
      {
        id: 1,
        status: VIRUS_STATUS.ALIVE,
      },
      {
        id: 2,
        status: VIRUS_STATUS.ALIVE,
      },
      {
        id: 3,
        status: VIRUS_STATUS.ALIVE,
      },
      {
        id: 4,
        status: VIRUS_STATUS.ALIVE,
      },
    ],
  });
};
