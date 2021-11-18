import { middyfyWithoutBodyParser } from '@libs/lambda';
import { formatJSONResponse, IdParamRequiredEventAPIGatewayProxyHandler } from '@libs/apiGateway';

const kill: IdParamRequiredEventAPIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  console.log('Virus killed');
  return formatJSONResponse({ id });
}

export const main = middyfyWithoutBodyParser(kill);