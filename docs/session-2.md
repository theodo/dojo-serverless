## Session 2: Learn how to use DynamoDB in your application

First, checkout session-2 branch, and deploy the ressources for session-2.

```
git checkout session-2-v3
cd backend
sls deploy
```

You can then open:

- [Cloudformation](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1) interface to check out the ressources that have been created
- [API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1) interface to check out your API and your routes.
- [AWS Lambda](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1) to check out your lambdas
- [AWS Cloudwatch](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1) to check out their execution logs (log stream tab)

### Pro tips before starting:

- **Deploy single Lambda function** : If you want to deploy only one function, use `yarn serverless deploy function -f <your-function-name>` (ou `yarn sls deploy function -f <your-function-name>`). It is much faster (~5s) than deploying a stack (~30s) but will only deploy the function's code, not any config change in your `serverless.ts`.
- **Test locally a Lambda function** : To call locally one function, use `yarn sls invoke -f <your-function-name> --path path/to/mocked-event.json`.
- **Debug locally an uploaded Lambda function** : You can have locally the logs of an already uploaded lambda that runs on AWS instead of connecting to the console. For that you may use `yarn sls logs -f <your-function-name>`. For more information you can go to that [page](https://www.serverless.com/framework/docs/providers/aws/cli-reference/logs).
- **Debug services other than Lambda** : The first thing to do if your stack doesn't work the way you want and you have to debug it, it's to spot the service that causes the issue. The most reliable method for services such as DynamoDB or APIGateway is to use the AWS console and check directly on it. Check this [page](./aws-console-guide.md) whenever you are lost on the AWS console.

### Create your first DynamoDb

If you haven't done it yet, in the front-end folder, copy-paste `.env.development` as `.env.development.local` and replace the httpApiId by yours (you can find it in [API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1)), and run `yarn` and `yarn start`.

Then, in the back-end folder, notice the new `src/resources/dynamodb.yml` resource in the resources folder. Notice its `tableName`, `partitionKey` and `sortKey`. 

To deploy it:

- Add the dynamo-db table as a ressource in the `serverless.yml`. To do so you need to create it thanks to the aws-cdk and add it to the stack of resources. This stack of resources has already the apiGatewayErrors in it. You can do it by uncommenting in `src/resources/index.ts` the lines regarding dynamodb table.
- Give your lambdas the IAM rights to `Query`, `Put` and `Delete` Items on this table by uncommenting the correct blocks in the `serverless.yml`. Be careful also with the variable and the type needed to make it work, don't forget to import them.
- Deploy your stack
- Go to [DynamoDB service](https://eu-west-1.console.aws.amazon.com/dynamodb/home?region=eu-west-1) to check your newly created table. Notice the default item attributes: `partitionKey` and `sortKey` from the yml ressource.

### Now, it's your turn 💪

We will use the AWS SDK to interact with this table:

```typescript
import {
  DeleteCommand,
  DynamoDBDocumentClient
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
```

Now, it's your turn:

- Open the [AWS dynamoDb DocumentClient documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html) to learn how to use the `send` method with its commands `QueryCommand`, `PutCommand`, `DeleteCommand` and `UpdateCommand` methods. This [link](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_lib_dynamodb.html) can also help you.
- Implement the get route to get Virus items instead of hard-coded ones.
- Implement post route that adds a Virus item to the db by adding a trigger to the `createVirus` lambda and call it in the frontend in the addVirus button onClick.
- Implement the delete route and call it in the frontend in viruses onClicks.
- [BONUS] Implement a `/kill-count` GET route that transmits a new `KillCount` item that increases each time a `Virus` deletion is successful, and use it in the front-end (a [useful link](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html#Expressions.UpdateExpressions.ADD))

Done ? Nice work ! Don't forget to kill your stack by running `serverless remove` in the backend folder !

To see final result, checkout the start of [session 3](./session-3.md).
