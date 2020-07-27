import { DynamoDBStreamEvent } from 'aws-lambda';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { getAllConnections } from '@libs/connections';
import { sendMessageToConnection } from '@libs/websocket';
import { Item } from '@libs/types';
import { Virus } from '../virus/types';

const sendMessageToEachConnection = async (message: any): Promise<void> => {
  const connections = await getAllConnections();
  await Promise.all(
    connections.map(({ connectionId, endpoint }) =>
      sendMessageToConnection({
        connectionId,
        endpoint,
        message,
      }),
    ),
  );
};

const isVirus = (item: Item): item is Virus => item.partitionKey === 'Virus';

export const main = async (event: DynamoDBStreamEvent): Promise<void> => {
  await Promise.all(
    event.Records.map(({ eventName, dynamodb }) => {
      if (eventName === 'INSERT' && dynamodb && dynamodb.NewImage) {
        const newItem = Converter.unmarshall(dynamodb.NewImage) as Item;
        if (isVirus(newItem)) {
          return sendMessageToEachConnection({ virusId: newItem.sortKey });
        }
      }
    }),
  );
};
