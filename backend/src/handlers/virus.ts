import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { success, failure, error } from 'libs/response';
import { fetchVirus } from 'loaders/virus';
import { VirusProps } from 'model/Virus';
import {
  createVirus as repositoryCreateVirus,
  fetchViruses,
  deleteVirus,
} from 'repository/virus';

const getRandomPosition = (n: number) => Math.floor(Math.random() * n);

export const all: APIGatewayProxyHandler = async () => {
  return success(await fetchViruses());
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
    return error({ message: 'No id provided' });
  }

  const { id } = event.pathParameters;

  await deleteVirus(id);

  return success({ id });
};

export const create: APIGatewayProxyHandler = async () => {
  // should be moved in factory
  const virusImages = [
    '/static/media/Virus1.d02ce17d.png',
    '/static/media/Virus6.9a59198b.png',
    '/static/media/Virus3.2be44a17.png',
    '/static/media/Virus4.3094571b.png',
  ];

  const virusCreated: VirusProps = await repositoryCreateVirus({
    id: '',
    positionX: getRandomPosition(100),
    positionY: getRandomPosition(100),
    src: virusImages[getRandomPosition(4)],
  });

  return success(virusCreated);
};
