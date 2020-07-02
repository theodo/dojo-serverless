import { APIGatewayProxyHandler } from 'aws-lambda';

export const main: APIGatewayProxyHandler = async event => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'Your function executed successfully!',
    input: event,
  }),
});
