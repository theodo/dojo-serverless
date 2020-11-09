import * as AwsConfig from 'serverless/aws';

import ApiGatewayErrors from './resources/apiGatewayErrors';
import DojoServerlessTable from './resources/dynamodb';

const serverlessConfiguration: AwsConfig.Serverless = {
  service: 'dojo-serverless-backend',
  frameworkVersion: '>=1.83',
  plugins: [
    'serverless-webpack',
    'serverless-step-functions',
    'serverless-offline',
  ],
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
          'dynamodb:Scan',
          'dynamodb:DeleteItem',
          'dynamodb:ListStreams',
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
    virus: {
      handler: 'src/handlers/virusHandler.all',
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
    virusOne: {
      handler: 'src/handlers/virusHandler.one',
      events: [
        {
          http: {
            method: 'get',
            path: 'virus/{id}',
            cors: true,
          },
        },
      ],
    },
    virusKill: {
      handler: 'src/handlers/virusHandler.kill',
      events: [
        {
          http: {
            method: 'get',
            path: 'virus/{id}/kill',
            cors: true,
          },
        },
      ],
    },
    virusCreate: {
      handler: 'src/handlers/virusHandler.create',
      events: [{ schedule: 'rate(1 hour)' }],
    },
  },
  resources: {
    Resources: {
      ...ApiGatewayErrors,
      DojoServerlessTable,
    },
  },
};

module.exports = serverlessConfiguration;
