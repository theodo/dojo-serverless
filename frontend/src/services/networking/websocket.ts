import ReconnectingWebsocket from 'reconnecting-websocket';

export const websocketConnexion = new ReconnectingWebsocket(
  `${process.env.REACT_APP_WEBSOCKET_URL}`,
);
