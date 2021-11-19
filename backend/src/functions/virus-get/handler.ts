import { formatJSONResponse } from '@libs/apiGateway';
import { Virus } from '../types';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfyWithoutBodyParser } from '@libs/lambda';
import {
  QueryCommand,
  DynamoDBDocumentClient
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const documentClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const get: APIGatewayProxyHandler = async () => {
  const { Items = [] } = await documentClient.send(
    new QueryCommand({
      TableName: 'dojo-serverless-table',
      KeyConditionExpression: 'partitionKey = :partitionKey',
      ExpressionAttributeValues: { ':partitionKey': 'Virus' },
    }),
  );
  return formatJSONResponse({ viruses: (Items as Virus[]).map(({ sortKey }) => ({ id: sortKey })) });
}

export const main = middyfyWithoutBodyParser(get);