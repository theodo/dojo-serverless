import { success } from '@libs/response';
import { createConnection } from '@libs/connections';
import {
  extractEndpointFromEvent,
  WebSocketConnectRequestEvent,
} from '@libs/websocket';

export const main = async (event: WebSocketConnectRequestEvent) => {
  const endpoint = extractEndpointFromEvent(event);
  await createConnection(event.requestContext.connectionId, endpoint);

  return success({});
};
