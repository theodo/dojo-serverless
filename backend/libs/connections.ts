// @ts-nocheck
import { DynamoDB } from 'aws-sdk';
import { Item } from './types';

interface Connection extends Item {
  partitionKey: 'Connection';
  endpoint: string;
}

const documentClient = new DynamoDB.DocumentClient();

export const createConnection = async (
  connectionId: string,
  endpoint: string,
): Promise<void> => {
  // TODO insert a connection in the DynamoDB
};

export const deleteConnection = async (connectionId: string): Promise<void> => {
  // TODO delete a connection from the DynamoDB
};

export const getAllConnections = async (): Promise<
  { connectionId: string; endpoint: string }[]
> => {
  // TODO fetch every connections from the DynamoDB
  return (Items as Connection[]).map(({ sortKey, endpoint }) => ({
    connectionId: sortKey,
    endpoint,
  }));
};
