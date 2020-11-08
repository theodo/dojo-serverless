import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { success, failure } from 'libs/response';
import { fetchVirus, fetchViruses, killVirus } from 'loaders/virus';
import { VirusProps } from 'model/Virus';
import { createVirus as repositoryCreateVirus } from 'repository/virus';

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

export const kill: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return failure({ message: 'No id provided' });
  }

  const { id } = event.pathParameters;

  return success(killVirus(id));
};

export const create: APIGatewayProxyHandler = async () => {
  const virusCreated: VirusProps = await repositoryCreateVirus({
    id: '',
    positionX: 30,
    positionY: 24,
    src: '/static/media/Virus1.d02ce17d.png',
  });

  return success(virusCreated);
};
