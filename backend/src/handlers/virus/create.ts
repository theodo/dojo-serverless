import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

import uuid from 'uuid';
import { success } from '@libs/response';
import { getAllConnections } from '@libs/connections';
import { sendMessageToConnection } from '@libs/websocket';

const documentClient = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async () => {
  const virusId = uuid();

  await documentClient
    .put({
      TableName: 'dojo-serverless-table',
      Item: { partitionKey: 'Virus', sortKey: virusId },
    })
    .promise();

  const connections = await getAllConnections();
  await Promise.all(
    connections.map(({ connectionId, endpoint }) =>
      sendMessageToConnection({
        connectionId,
        endpoint,
        message: { virusId },
      }),
    ),
  );

  return success({ id: virusId });
};
