import { APIGatewayProxyHandler } from 'aws-lambda';
import { failure, success } from '@libs/response';
import { VIRUS_STATUS } from 'src/models/virus';

export const main: APIGatewayProxyHandler = async event => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return failure({ message: 'No id provided' });
  }

  const { id } = event.pathParameters;
  const virusId: number = parseInt(decodeURI(id), 10);

  return success({
    id: virusId,
    status: VIRUS_STATUS.ALIVE,
  });
};
