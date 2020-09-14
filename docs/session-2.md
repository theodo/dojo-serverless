## Session 2: Learn how to use DynamoDB in your application

First, checkout session-2 branch, and deploy the ressources for session-2.

```
git checkout session-2-v2
cd backend
sls deploy
```

You can then open:

- [Cloudformation](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1) interface to check out the ressources that have been created
- [API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1) interface to check out your API and your routes.
- [AWS Lambda](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1) to check out your lambdas
- [AWS Cloudwatch](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1) to check out their execution logs (log stream tab)

### Create your first DynamoDb

If you haven't done it yet, in the front-end folder, copy-paste `.env.development` as `.env.development.local` and replace the httpApiId by yours (you can find it in [API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1)), and run `yarn` and `yarn start`.

Then, in the back-end folder, notice the new `dynamodb.yml` resource in the resources folder. Notice its `TableName`, `AttributeNames` and `KeySchema`.

To deploy it:

- Add the dynamo-db table as a ressource in the `serverless.ts` (end of file)
- Give your lambdas the IAM rights to `Query`, `Put` and `Delete` Items on this table by uncommenting the correct blocks in the `serverless.ts`.
- Deploy your stack
- Go to [DynamoDB service](https://eu-west-1.console.aws.amazon.com/dynamodb/home?region=eu-west-1) to check your newly created table. Notice the default item attributes: `partitionKey` and `sortKey` from the yml ressource.

### Now, it's your turn 💪

We will use the AWS SDK to interact with this table:

```typescript
import { DynamoDB } from "aws-sdk";
```

Now, it's your turn:

- Open the [AWS dynamoDb DocumentClient documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html) to learn how to use its `query`, `put` and `delete` methods.
- Implement the get route to get Virus items instead of hard-coded ones.
- Create a post route that adds a Virus item to the db by adding a trigger to the `createVirus` lambda and call it in the frontend in the addVirus button onClick.
- Implement the delete route and call it in the frontend in viruses onClicks.

**Pro tips**:

- If you want to deploy only one function, use `yarn deploy -f <your-function-name>`. It is much faster (~10s) than deploying a stack (~30s) but will only deploy the function's code, not any config change in your `serverless.ts`.
- To call locally one function, use `serverless invoke -f <your-function-name> --path path/to/mocked-event.json`

Done ? Nice work ! Don't forget to kill your stack by running `serverless remove` in the backend folder !

To see final result, checkout the start of [session 3](./session-3.md).
