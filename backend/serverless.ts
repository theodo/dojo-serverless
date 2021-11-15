import ApiGatewayErrors from './resources/apiGatewayErrors';

// remplacer le typage
const serverlessConfiguration = {
  service: 'dojo-serverless-backend',
  frameworkVersion: '>=1.83',
  plugins: ['serverless-webpack', 'serverless-step-functions'],
  configValidationMode: 'error',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: 'dev',
    profile: 'dojo-serverless',
    apiGateway: {
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
      }
    },
    lambdaHashingVersion: '20201221'
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
  },
  resources: {
    Resources: {
      ...ApiGatewayErrors,
    },
  },
};

module.exports = serverlessConfiguration;
