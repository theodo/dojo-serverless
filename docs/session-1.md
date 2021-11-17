## Session 1: Set up a serverless application with simple functions

### Set up your AWS profile

Before you can do anything in this dojo you need an AWS account. For that you can follow this [link](https://www.notion.so/m33/Ajout-d-un-compte-b8ae44dd8a7548b1ba55abca6971ca27#19de3b1529d44e188b295df4f2b8dc3c).

Then follow [this documentation](./setup-aws.md) to setup a `dojo-serverless` AWS profile on your computer (or, if you want to use another AWS profile, specify it in the `serverless.yml` later).

### Deploy your first Serverless app

First, checkout to the `session-1-v4` branch.

```
git checkout session-1-v4
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

### Backend structure
The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions                # Lambda configuration and source code folder
│   │   ├── hello
│   │   │   ├── handler.ts       # `Hello` lambda source code
│   │   │   ├── index.ts         # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json        # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts        # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts             # Import/export of all lambda configurations
│   │
│   ├── libs                     # Lambda shared code
│   │   ├── apiGateway.ts        # API Gateway specific helpers
│   │   ├── handlerResolver.ts   # Sharable library for resolving lambda handlers
│   │   ├── lambda.ts            # Lambda middleware
│   │   ├── connection.ts        # Handle websocket connections in DynamoDB (session 3)
│   │   ├── response.ts          # Helpers for building response object
│   │   ├── types.ts             # Types of items from Dynamo DB
│   │   └── websocket.ts         # Handle websocket responses (session 3)
│   │
│   └── resources                # Resources not taken into account by serverless.ts
│       └── apiGatewayErrors.ts  # API Gateway error responses configuration
│
├── package.json
├── serverless.ts                # Serverless service file
├── tsconfig.json                # Typescript compiler configuration
└── tsconfig.paths.json          # Typescript paths
```

### Pro tips before starting:

- **Deploy single Lambda function** : If you want to deploy only one function, use `yarn serverless deploy function -f <your-function-name>` (ou `yarn sls deploy function -f <your-function-name>`). It is much faster (~5s) than deploying a stack (~30s) but will only deploy the function's code, not any config change in your `serverless.ts`.
- **Test locally a Lambda function** : To call locally one function, use `yarn sls invoke -f <your-function-name> --path path/to/mocked-event.json`.
- **Debug locally an uploaded Lambda function** : You can have locally the logs of an already uploaded lambda that runs on AWS instead of connecting to the console. For that you may use `yarn sls logs -f <your-function-name>`. For more information you can go to that [page](https://www.serverless.com/framework/docs/providers/aws/cli-reference/logs).
- **Debug services other than Lambda** : The most reliable method to debug other services such as DynamoDB or APIGateway is to use the AWS console and check directly on it. Check this [page](./aws-console-guide.md) whenever you are lost on the AWS console.

### Now, it's your turn 💪

In the front-end folder, copy-paste `.env.development` as `.env.development.local` and replace the httpApiId by yours.
In order to run the frontend, from the root folder of this project run :

```
cd frontend
yarn
yarn start
```

Now, it's your turn:

- Connect your front-end to your back-end through a `/virus` GET route returning a mocked list of viruses. Name the folder containing your lambda configuration `virus-get`.
- You need to make sure to enable the cors policy and add the right headers in the http response, see how to it in this [link](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#enabling-cors). You can use the `success` method from `@libs/response` injects by itself the cors headers while returning a `APIGatewayProxyResult` object. Then apply that also on the following routes.
- Update your route to return a single (fake) virus if an id is provided as query param (log the event to see how to retrieve them). Log the event in the Lambda function and go check in CloudWatch Log Group (Groupe de Journaux) to see how to retrieve the query params.
- Create a `/virus` POST route. Link it to a `createVirus` lambda function that logs `Virus created`. In the frontend, trigger that endpoint on an addititon virus click. Then look for the log in log group. Name the folder containing your lambda configuration `virus-create`.
- Create a `/virus/{id}` DELETE route. You can use that [link](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#request-parameters) to help you on the request parameter. Link it to a `killVirus` lambda function that logs `Virus killed`. In the frontend, trigger that endpoint on a remove virus click. Then look for the log in log group. Name the folder containing your lambda configuration `virus-kill`.

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
