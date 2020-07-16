import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

import { success } from '@libs/response';

const documentClient = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async () => {
  const { Items = [] } = await documentClient
    .query({
      TableName: 'dojo-serverless-table',
      KeyConditionExpression: 'partitionKey = :partitionKey',
      ExpressionAttributeValues: { ':partitionKey': 'Virus' },
    })
    .promise();

  return success({
    viruses: Items.map(({ rangeKey }) => ({ id: rangeKey })),
  });
};
