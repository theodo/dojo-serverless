import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

import uuid from 'uuid';

import { success, failure } from 'libs/response';
import {
  createVirus,
  fetchVirus,
  fetchViruses,
  killVirus,
} from 'loaders/virus';

import { VIRUS_TABLE } from 'config/tables';

const documentClient = new DynamoDB.DocumentClient();

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
  const virusId = uuid();

  await documentClient
    .put({
      TableName: VIRUS_TABLE,
      Item: { partitionKey: 'Virus', sortKey: virusId },
    })
    .promise();

  return success(createVirus());
};
