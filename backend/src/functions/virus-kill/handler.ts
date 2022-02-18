import { middyfyWithoutBodyParser } from '@libs/lambda';
import { formatJSONResponse, IdParamRequiredEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import {
  DeleteCommand,
  DynamoDBDocumentClient
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const documentClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const kill: IdParamRequiredEventAPIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  await documentClient.send(
    new DeleteCommand({
      TableName: 'dojo-serverless-table',
      Key: { partitionKey: 'Virus', sortKey: id },
    }),
  );

  console.log('Virus killed');
  return formatJSONResponse({ id });
}

export const main = middyfyWithoutBodyParser(kill);