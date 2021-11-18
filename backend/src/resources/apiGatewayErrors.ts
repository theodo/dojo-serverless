import { App, Fn, Stack } from '@aws-cdk/core';
import { CfnGatewayResponse } from '@aws-cdk/aws-apigateway';

export const app = new App();
export const stack = new Stack(app, 'Stack');

new CfnGatewayResponse(stack, 'GatewayResponseDefault4XX', {
  responseType: 'DEFAULT_4XX',
  restApiId: Fn.ref('ApiGatewayRestApi'),
  responseParameters: {
    'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
    'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
  },
});

new CfnGatewayResponse(stack, 'GatewayResponseDefault5XX', {
  responseType: 'DEFAULT_5XX',
  restApiId: Fn.ref('ApiGatewayRestApi'),
  responseParameters: {
    'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
    'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
  },
});
