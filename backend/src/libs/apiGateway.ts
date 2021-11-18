import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyHandler<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

type IdParamRequiredEventAPIGatewayProxyEvent = Omit<APIGatewayProxyEvent, 'pathParameters'> & { pathParameters: { id: string } }
export type IdParamRequiredEventAPIGatewayProxyHandler = Handler<IdParamRequiredEventAPIGatewayProxyEvent, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(response)
  }
}
