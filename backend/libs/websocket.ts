import { APIGatewayEventRequestContext } from 'aws-lambda';

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
