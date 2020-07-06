## Session 1: Set up a serverless application with simple functions

First, checkout session-1 branch.

```
git checkout session-1
```

### Set up AWS on your computer

First follow [this documentation](./setup-aws.md) to setup AWS profile on your computer

### Bootstrap your serverless application

- First install globally serverless library on your computer

```
npm install -g serverless
```

- Go in `/backend` folder and use serverless start command to create your project

```
serverless create --template aws-nodejs-typescript
yarn
```

This will create a serverless.yml that will container the configuration of your ressources. Here are the information you'll have to fill out

```
service:
  name: <name of your service; ex: dojo-serverless>

plugins: # this allow you to extend serverless framework with plugins
  - serverless-webpack

provider: # this will contains all the configuration related to your provider (AWS here)
  name: aws
  runtime: nodejs12.x
  region: <ex: eu-west-1>
  stage: <your environment; ex: dev>
  profile: <the profile used to deploy>

functions:
  hello: # name of your function
    handler: hello.main # file that handle the function execution
    events: # element that trigger the function -> here it's an http call to API Gateway service
      - http:
          method: get
          path: hello

resources: # Allow to import Cloudformation files to configure your ressources (DynamoDB, API Gateway etc.)
  - <path-to-ressouce-file>

custom: # Allow to define custom keys that can be used in the file with  ${self:custom.<key>}
  key: test
```

- **Bonus**: The create command has also generated `webpack.config.js` which will allow the serverless-webpack plugin to parse correctly the typescript and `tsconfig.json` to configure typescript.

### Deploy !

- To deploy your newly created stack, run `serverless deploy`
- Go to [AWS Single Sign-On](https://theodo.awsapps.com/start/#/) and loggin to your account.
- Go on [Cloudformation](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1) interface to check out the ressources that have been created
- Go on [API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1) interface to check out your API and your routes
- Go on [AWS Lambda](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1) to check out your lambdas
- Go on [AWS Cloudwatch](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1) to check out their execution logs (log stream tab)
- If you call your ressource with the url returned by the command `https://{apiId}.execute-api.eu-west-1.amazonaws.com/dev/hello`, you should get your response !

**Pro tips**:

- If you want to deploy only one function, use `serverless deploy -f <your-function-name>`. It is much faster but will only deploy the function's code, not any config change.
- To call locally one function, use `serverless invoke -f <your-function-name> --path path/to/mocked-event.json`

### Goals of the session

In the front-end folder, copy-paste `.env.development` as `.env.development.local` and replace the httpApiId by yours.

Run `yarn` and `yarn start` in the front-end session.

Goals:

- Connect your front-end to your back-end through a `/virus` get route returning a mocked list of viruses.
- Update your route to return a single virus if an id is provided as query param (log the event to see how to retrieve them).
- Create a `createVirus` lambda that triggers every minute and does nothing for the moment (a [useful link](https://www.serverless.com/framework/docs/providers/aws/events/schedule/)) (but don't forget to remove it at the end of the session !)
- Create a `virus/{id}` delete route that is requested on a virus click, and that does nothing for the moment. (a [useful link](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#request-parameters) and [another one](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#enabling-cors))

### Conclusion

Don't forget to kill your stack by running `serverless remove` in the backend folder !

To see final result, checkout session-2 branch
