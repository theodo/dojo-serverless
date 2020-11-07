import * as AwsConfig from 'serverless/aws';

import ApiGatewayErrors from './resources/apiGatewayErrors';

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
      handler: 'src/handlers/virus.all',
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
      handler: 'src/handlers/virus.one',
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
      handler: 'src/handlers/virus.kill',
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
      handler: 'src/handlers/virus.create',
      events: [{ schedule: 'rate(1 minute)' }],
    },
  },
  resources: {
    Resources: {
      ...ApiGatewayErrors,
    },
  },
};

module.exports = serverlessConfiguration;
