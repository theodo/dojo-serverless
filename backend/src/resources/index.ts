import { App, Stack } from '@aws-cdk/core';
// import initDynamodb from './dynamodb';
import initApiGatewayErrors from './apiGatewayErrors';

export const app = new App();
export const stack = new Stack(app, 'Stack');

// export const table = initDynamodb(stack);
initApiGatewayErrors(stack);