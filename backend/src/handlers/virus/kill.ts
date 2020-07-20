import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

import { failure, success } from '@libs/response';

const documentClient = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async event => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return failure({ message: 'No id provided' });
  }

  const { id } = event.pathParameters;

  await documentClient
    .delete({
      TableName: 'dojo-serverless-table',
      Key: { partitionKey: 'Virus', sortKey: id },
    })
    .promise();

  return success({ id });
};
