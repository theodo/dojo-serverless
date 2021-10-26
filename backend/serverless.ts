/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as AwsConfig from 'serverless/aws';

import ApiGatewayErrors from './resources/apiGatewayErrors';
import DojoServerlessTable from './resources/dynamodb';
import ApplicationEventBus from './resources/eventBridge';

const serverlessConfiguration: AwsConfig.Serverless = {
  service: 'dojo-serverless-backend',
  frameworkVersion: '>=1.83',
  plugins: [
    'serverless-webpack',
    'serverless-pseudo-parameters',
    'serverless-step-functions',
  ],
  configValidationMode: 'warn',
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
          'dynamodb:ListStreams',
        ],
        Resource: { 'Fn::GetAtt': ['DojoServerlessTable', 'Arn'] },
      },
      { Effect: 'Allow', Action: ['events:PutEvents'], Resource: '*' },
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
    connectWebsocket: {
      handler: 'src/handlers/real-time/connect.main',
      events: [{ websocket: { route: '$connect' } }],
    },
    disconnectWebsocket: {
      handler: 'src/handlers/real-time/disconnect.main',
      events: [
        {
          websocket: { route: '$disconnect' },
        },
      ],
    },
    sendMessageToClient: {
      handler: 'src/handlers/real-time/sendMessageToClient.main',
      events: [
        {
          stream: {
            // @ts-ignore
            type: 'dynamodb',
            // @ts-ignore
            arn: { 'Fn::GetAtt': ['DojoServerlessTable', 'StreamArn'] },
          },
        },
      ],
    },

    //  --- STATE MACHINE ---
    requestNothing: {
      handler: 'src/handlers/stateMachine/requestNothing.main',
      events: [
        {
          eventBridge: {
            eventBus:
              'arn:aws:events:#{AWS::Region}:#{AWS::AccountId}:event-bus/dojo-serverless',
            pattern: {
              source: ['dojo-serverless'],
              'detail-type': ['LAZYNESS_DETECTED'],
            },
          },
        },
        // { schedule: 'rate(1 minute)' },
      ],
    },
    spreadVirus: {
      handler: 'src/handlers/stateMachine/spreadVirus.main',
      // events: [{ schedule: 'rate(1 minute)' }],
    },
    chooseWaitTime: {
      handler: 'src/handlers/stateMachine/chooseWaitTime.main',
    },
  },
  stepFunctions: {
    stateMachines: {
      wait10SecondsAndDoNothing: {
        events: [
          {
            cloudwatchEvent: {
              eventBusName:
                'arn:aws:events:#{AWS::Region}:#{AWS::AccountId}:event-bus/dojo-serverless',
              event: {
                source: ['dojo-serverless'],
                'detail-type': ['NOTHING_REQUESTED'],
              },
            },
          },
        ],
        definition: {
          StartAt: 'Wait10Sec',
          States: {
            Wait10Sec: {
              Type: 'Wait',
              Seconds: 10,
              Next: 'DoNothing',
            },
            DoNothing: { Type: 'Succeed' },
          },
        },
      },
      waitXSecondsAndCreateVirus: {
        events: [
          {
            cloudwatchEvent: {
              eventBusName:
                'arn:aws:events:#{AWS::Region}:#{AWS::AccountId}:event-bus/dojo-serverless',
              event: {
                source: ['dojo-serverless'],
                'detail-type': ['VIRUS_CREATION_REQUESTED'],
              },
            },
          },
        ],
        definition: {
          StartAt: 'ChooseWaitTime',
          States: {
            ChooseWaitTime: {
              Type: 'Task',
              Resource: { 'Fn::GetAtt': ['chooseWaitTime', 'Arn'] },
              Next: 'WaitXSec',
            },
            WaitXSec: {
              Type: 'Wait',
              SecondsPath: '$.numberOfSeconds',
              Next: 'CreateVirus',
            },
            CreateVirus: {
              Type: 'Task',
              Resource: { 'Fn::GetAtt': ['createVirus', 'Arn'] },
              End: true,
            },
          },
        },
      },
    },
  },
  resources: {
    Resources: {
      ...ApiGatewayErrors,
      DojoServerlessTable,
      ApplicationEventBus,
    },
  },
};

module.exports = serverlessConfiguration;
