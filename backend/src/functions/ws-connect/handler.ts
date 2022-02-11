import { formatJSONResponse } from '@libs/apiGateway';
import { WebSocketConnectRequestEvent, extractEndpointFromEvent } from '@libs/websocket';
import { createConnection } from '@libs/connections';

export const main = async (event: WebSocketConnectRequestEvent) => {
  const endpoint = extractEndpointFromEvent(event);
  await createConnection(event.requestContext.connectionId, endpoint);
  return formatJSONResponse({});
}