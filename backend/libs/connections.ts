import { DynamoDB } from 'aws-sdk';

const documentClient = new DynamoDB.DocumentClient();

export const createConnection = async (
  connectionId: string,
  endpoint: string,
): Promise<void> => {
  await documentClient
    .put({
      TableName: 'dojo-serverless-table',
      Item: { partitionKey: 'Connection', sortKey: connectionId, endpoint },
    })
    .promise();
};

export const deleteConnection = async (connectionId: string): Promise<void> => {
  await documentClient
    .delete({
      TableName: 'dojo-serverless-table',
      Key: { partitionKey: 'Connection', sortKey: connectionId },
    })
    .promise();
};
