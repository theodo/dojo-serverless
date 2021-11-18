import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface RequestContext {
  authorizer: {
    claims: {
      'cognito:username': string;
    };
  };
}

export interface Event extends Omit<APIGatewayProxyEvent, 'requestContext'> {
  body: string;
  requestContext: RequestContext;
  pathParameters: {
    id: string;
  };
}

function buildResponse(
  statusCode: number,
  body: Record<string, unknown>,
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(body),
  };
}

export function success(body: Record<string, unknown>): APIGatewayProxyResult {
  return buildResponse(200, body);
}

export function failure(body: Record<string, unknown>): APIGatewayProxyResult {
  return buildResponse(500, body);
}
