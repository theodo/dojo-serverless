## Session 1: Set up a serverless application with simple functions

### Set up your AWS profile

First follow [this documentation](./setup-aws.md) to setup a `dojo-serverless` AWS profile on your computer (or, if you want to use another AWS profile, specify it in the `serverless.yml` later).

### Deploy your first Serverless app

First, install serverless globally and checkout to the `session-1-v3` branch. You must make sure your version of node is not greater than the LTS node version.

```
npm install -g serverless
git checkout session-1-v3
```

Install your backend and deploy your stack !

```
cd backend
yarn
yarn deploy
```

That's it! Once your stack is deployed:

- Go to [AWS Single Sign-On](https://theodo.awsapps.com/start/#/) and loggin to your account.
- Go on [Cloudformation](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1) interface to check out the ressources that have been created
- Go on [API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1) interface to check out your API and your routes. Write down your API id !
- Go on [AWS Lambda](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1) to check out your lambdas
- If you call your ressource with the url returned by the command `https://{apiId}.execute-api.{region}.amazonaws.com/{stage}/hello`, you should get your response (you can find the region and the stage in your `serverless.ts`)!
- Go on [AWS Cloudwatch](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1) to check out their execution logs (log stream tab)

### Now, it's your turn 💪

In the front-end folder, copy-paste `.env.development` as `.env.development.local` and replace the httpApiId by yours.

Run `yarn` and `yarn start`. Now, it's your turn:

- Connect your front-end to your back-end through a `/virus` GET route returning a mocked list of viruses.
- Update your route to return a single (fake) virus if an id is provided as query param (log the event to see how to retrieve them).
- Create a `createVirus` lambda that triggers every minute and does nothing for the moment (a [useful link](https://www.serverless.com/framework/docs/providers/aws/events/schedule/)) (but don't forget to remove it at the end of the session !)
- Create a `virus/{id}` DELETE route that is requested on a virus click, and that does nothing for the moment. (a [useful link](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#request-parameters) and [another one](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#enabling-cors))

**Pro tips**:

- If you want to deploy only one function, use `serverless deploy -f <your-function-name>`. It is much faster (~5s) than deploying a stack (~30s) but will only deploy the function's code, not any config change in your `serverless.ts`.
- To call locally one function, use `serverless invoke -f <your-function-name> --path path/to/mocked-event.json`

Done ? Nice work ! Don't forget to kill your stack by running `serverless remove` in the backend folder !

To see final result, checkout the start of [session 2](./session-2.md).

### Bonus: Bootstrap your serverless application

This branch gives you the necessary means to start coding right away. If you didn't have a code base to start with, here are the steps to get one from scratch:

- Install globally serverless library on your computer

```
npm install -g serverless
```

- Go in `/backend` folder and use serverless start command to create your project

```
serverless create --template aws-nodejs-typescript
yarn
```

This will create a `serverless.yml` that will container the configuration of your ressources. Here are the information you'll have to fill out

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

The create command has also generated `webpack.config.js` which will allow the serverless-webpack plugin to parse correctly the typescript and `tsconfig.json` to configure typescript.
