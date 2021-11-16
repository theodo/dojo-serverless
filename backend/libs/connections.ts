import { DynamoDBDocumentClient, PutCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Item } from './types';

interface Connection extends Item {
  partitionKey: 'Connection';
  endpoint: string;
}

const documentClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "eu-west-1" }));

export const createConnection = async (
  connectionId: string,
  endpoint: string,
): Promise<void> => {
  await documentClient
    .send(new PutCommand({
      TableName: 'dojo-serverless-table',
      Item: { partitionKey: 'Connection', sortKey: connectionId, endpoint },
    }));
};

export const deleteConnection = async (connectionId: string): Promise<void> => {
  await documentClient
    .send(new DeleteCommand({
      TableName: 'dojo-serverless-table',
      Key: { partitionKey: 'Connection', sortKey: connectionId },
    }));
};

export const getAllConnections = async (): Promise<
  { connectionId: string; endpoint: string }[]
> => {
  const { Items = [] } = await documentClient
    .send(new QueryCommand({
      TableName: 'dojo-serverless-table',
      KeyConditionExpression: 'partitionKey = :partitionKey',
      ExpressionAttributeValues: { ':partitionKey': 'Connection' },
    }));
  return (Items as Connection[]).map(({ sortKey, endpoint }) => ({
    connectionId: sortKey,
    endpoint,
  }));
};
