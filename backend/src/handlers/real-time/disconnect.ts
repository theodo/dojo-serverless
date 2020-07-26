import { success } from '@libs/response';
import { deleteConnection } from '@libs/connections';
import { WebSocketDisconnectRequestEvent } from '@libs/websocket';

export const main = async (event: WebSocketDisconnectRequestEvent) => {
  await deleteConnection(event.requestContext.connectionId);

  return success({});
};
