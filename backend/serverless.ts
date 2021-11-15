import ApiGatewayErrors from './resources/apiGatewayErrors';

// remplacer le typage
const serverlessConfiguration = {
  service: 'dojo-serverless-backend',
  frameworkVersion: '>=1.83',
  plugins: ['serverless-esbuild', 'serverless-step-functions'],
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
    lambdaHashingVersion: '20201221',
    environment: {
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
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
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      ...ApiGatewayErrors,
    },
  },
};

module.exports = serverlessConfiguration;
