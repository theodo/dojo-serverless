import { APIGatewayEventRequestContext } from 'aws-lambda';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { deleteConnection } from '@libs/connections';

interface WebSocketRequestContext<MessageRouteKey>
  extends APIGatewayEventRequestContext {
  connectionId: string;
  domainName: string;
  routeKey: MessageRouteKey;
}

export interface WebSocketConnectRequestEvent {
  requestContext: WebSocketRequestContext<'$connect'>;
}

export interface WebSocketDisconnectRequestEvent {
  requestContext: WebSocketRequestContext<'$disconnect'>;
}

export const extractEndpointFromEvent = (
  event: WebSocketConnectRequestEvent,
): string => `${event.requestContext.domainName}/${event.requestContext.stage}`;

export const sendMessageToConnection = async ({
  connectionId,
  endpoint,
  message,
}: {
  connectionId: string;
  endpoint: string;
  message: any;
}): Promise<void> => {
  const apiGatewayClient = new ApiGatewayManagementApiClient({
    apiVersion: '2018-11-29',
    endpoint: `https://${endpoint.slice(0, endpoint.length - 4)}`,
  });
  try {
    console.log('(1)(1) apiGatewayClient', apiGatewayClient);
    await apiGatewayClient.send(
      new PostToConnectionCommand({
        ConnectionId: connectionId,
        Data: Buffer.from(JSON.stringify(message)),
      }),
    );
    console.log('(1)(2)');
  } catch (error) {
    if (error.statusCode !== 410) {
      console.log('(error)');
      throw error;
    }
    console.log(`Found stale connection, deleting ${connectionId}`);
    await deleteConnection(connectionId);
  }
};
