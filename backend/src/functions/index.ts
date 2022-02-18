import hello from './hello';
import getVirus from './virus-get';
import killVirus from './virus-kill';
import createVirus from './virus-create';
import wsConnect from './ws-connect';
import wsDisconnect from './ws-disconnect';
import sendMessageToClient from './sendMessageToClient';

export const functions = {
  hello,
  getVirus,
  killVirus,
  createVirus,
  wsConnect,
  wsDisconnect,
  sendMessageToClient
};
