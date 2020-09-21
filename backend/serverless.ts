import * as AwsConfig from 'serverless/aws';

import ApiGatewayErrors from './resources/apiGatewayErrors';
import DojoServerlessTable from './resources/dynamodb';

const serverlessConfiguration: AwsConfig.Serverless = {
  service: 'dojo-serverless-backend',
  frameworkVersion: '>=1.83',
  plugins: ['serverless-webpack'],
  // @ts-ignore
  configValidationMode: 'error',
  provider: {
    name: 'aws',
    runtime: 'nodejs10.x',
    region: 'eu-west-1',
    stage: 'dev',
    profile: 'dojo-serverless',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:PutItem',
          'dynamodb:DeleteItem',
          // 'dynamodb:ListStreams',
        ],
        Resource: { 'Fn::GetAtt': ['DojoServerlessTable', 'Arn'] },
      },
    ],
    usagePlan: {
      quota: {
        limit: 5000,
        offset: 2,
        period: 'MONTH',
      },
      throttle: {
        burstLimit: 200,
        rateLimit: 100,
      },
    },
  },
  functions: {
    hello: {
      handler: 'hello.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
            cors: true,
          },
        },
      ],
    },
    createVirus: {
      handler: 'src/handlers/virus/create.main',
      events: [
        {
          http: {
            method: 'post',
            path: 'virus',
            cors: true,
          },
        },
      ],
    },
    getVirus: {
      handler: 'src/handlers/virus/get.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'virus',
            cors: true,
          },
        },
      ],
      // TODO: trigger createVirus every minute
    },
    killVirus: {
      handler: 'src/handlers/virus/kill.main',
      events: [
        {
          http: {
            method: 'delete',
            path: 'virus/{id}',
            cors: true,
          },
        },
      ],
    },

    //  --- WEBSOCKET ---
    // TODO: trigger connect lambda on websocket connection

    // TODO: trigger disconnect lambda on websocket disconnection

    // sendMessageToClient: {
    //   handler: 'src/handlers/real-time/sendMessageToClient.main',
    //   events: [
    //     {
    //       stream: {
    //         // @ts-ignore
    //         type: 'dynamodb',
    //         // @ts-ignore
    //         arn: { 'Fn::GetAtt': ['DojoServerlessTable', 'StreamArn'] },
    //       },
    //     },
    //   ],
    // },
  },
  resources: {
    Resources: {
      ...ApiGatewayErrors,
      DojoServerlessTable,
    },
  },
};

module.exports = serverlessConfiguration;
