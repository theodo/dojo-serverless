import { APIGatewayProxyEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import AttributeMap = DocumentClient.AttributeMap;

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

interface HttpResponse {
  statusCode: number;
  headers: {
    [key: string]: string;
  };
  body: string;
}

interface ResponseBody {
  status?: boolean;
  error?: string;
}

type Body = ResponseBody | AttributeMap[] | AttributeMap;

function buildResponse(statusCode: number, body: Body): HttpResponse {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(body),
  };
}

export function success(body: Body): HttpResponse {
  return buildResponse(200, body);
}

export function failure(body: Body): HttpResponse {
  return buildResponse(500, body);
}
