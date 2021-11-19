import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfyWithoutBodyParser } from '@libs/lambda';
import uuid from 'uuid';
import {
  PutCommand,
  DynamoDBDocumentClient
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const documentClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const kill: APIGatewayProxyHandler = async () => {
  const id = uuid();

  await documentClient.send(
    new PutCommand({
      TableName: 'dojo-serverless-table',
      Item: { partitionKey: 'Virus', sortKey: id },
    }),
  );

  return formatJSONResponse({ id });
}

export const main = middyfyWithoutBodyParser(kill);