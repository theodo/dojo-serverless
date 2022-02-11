import { formatJSONResponse } from '@libs/apiGateway';
import { WebSocketDisconnectRequestEvent } from '@libs/websocket';
import { deleteConnection } from '@libs/connections';

export const main = async (event: WebSocketDisconnectRequestEvent) => {
  await deleteConnection(event.requestContext.connectionId);
  return formatJSONResponse({});
}
