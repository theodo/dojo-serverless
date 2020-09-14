import * as AwsConfig from 'serverless/aws';

import ApiGatewayErrors from './resources/apiGatewayErrors';

const serverlessConfiguration: AwsConfig.Serverless = {
  service: 'dojo-serverless-backend',
  frameworkVersion: '>=1.83',
  plugins: ['serverless-webpack', 'serverless-step-functions'],
  // @ts-ignore
  configValidationMode: 'error',
  provider: {
    name: 'aws',
    runtime: 'nodejs10.x',
    region: 'eu-west-1',
    stage: 'dev',
    profile: 'dojo-serverless',
    iamRoleStatements: [
      // {
      //   Effect: 'Allow',
      //   Action: [
      //     'dynamodb:Query',
      //     'dynamodb:PutItem',
      //     'dynamodb:DeleteItem',
      //     'dynamodb:ListStreams',
      //   ],
      //   Resource: { 'Fn::GetAtt': ['DojoServerlessTable', 'Arn'] },
      // },
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
  },
  resources: {
    Resources: {
      ...ApiGatewayErrors,
    },
  },
};

module.exports = serverlessConfiguration;
