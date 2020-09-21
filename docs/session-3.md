## Session 3: Live updates on your frontend using Websockets

First, checkout session-3 branch, and deploy the resources for session-3.

```
git checkout session-3-v2
cd backend
sls deploy
```

You can then open:

- [Cloudformation](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1) interface to check out the ressources that have been created
- [API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1) interface to check out your API and your routes.
- [AWS Lambda](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1) to check out your lambdas
- [AWS Cloudwatch](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1) to check out their execution logs (log stream tab)
- [AWS DynamoDB](https://eu-west-1.console.aws.amazon.com/dynamodb/home?region=eu-west-1) to check the content of your DynamoDB Table

### Now, it's your turn 💪

**1. Store the connections**
    
- The lambdas `connect.ts` and `disconnect.ts` must be triggered when a new websocket connection is established and when a connection is closed.
Register them in the `serverless.ts` ([useful link](https://www.serverless.com/framework/docs/providers/aws/events/websocket/#websocket/))
- Implement `createConnection` to store a connection in the DynamoDB table when `connect.ts` is triggered
- Implement `deleteConnection` to delete the connection when `disconnect.ts` is triggered
- Deploy your stack
- Check on the [API Gateway](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1) interface that you have a new API Gateway

**2. Connect the frontend and add viruses on websocket messages**

- Execute `yarn intall` to get the new dependency: `reconnecting-websocket`
- Add your websocket API url in `REACT_APP_WEBSOCKET_URL` of `.env.development.local`
- Uncomment the code in `Home.tsx` to connect the frontend to the websocket API and add viruses when a message is received
- Check on the [DynamoDB](https://eu-west-1.console.aws.amazon.com/dynamodb/home?region=eu-west-1) interface that a connection is stored in the table when the frontend is started

**3. Send a virus to your frontend each minute**

- Trigger the `createVirus` lambda every minute ([useful link](https://www.serverless.com/framework/docs/providers/aws/events/schedule/#schedule/))
- Modify `create.ts` to send the created virus to the front through the Websocket API.
   You will need to:
   - Fetch all active connections
   - Send to each one a message with the new virus id ([useful link](https://www.serverless.com/framework/docs/providers/aws/events/websocket/#send-a-message-to-a-ws-client))
- To avoid the double display of a virus created by clicking on the +. Remove the code which display a new virus after the http call.

**Bonus 1: Use DynamoDB streams to separate createVirus from sendMessageToClient**

The lambda `createVirus` has two functions: create the virus and send a message to each client. It's a better practise to split it in two lambdas.

- Uncomment the code in `dynamodb.ts` to enable the stream of the DynamoDB. Lambdas could subscribe to this stream and be trigger at every action on the table
- Uncomment the code in `serverless.ts` to give the right to your lambda to listen the streams
- Uncomment the code in `serverless.ts` to trigger `sendMessageToClient` on DynamoDB stream
- Move the code which send the message to the clients from `create.ts` to `sendMessageToClient.ts`
- On every insert of Virus, send a message to the clients:
  - `SendMessageToClient` will receive events from the DynamoDB batched. You will need to loop over the batch to handle each event ([useful link](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.Tutorial.html#Streams.Lambda.Tutorial.LambdaFunction))
  - The object `NewImage` of a streamRecord must be parsed to be used: use `Converter.unmarshall` to parse it. ([useful link](https://stackoverflow.com/questions/44535445/unmarshall-dynamodb-json))
  - Don't forget to filter the record on `eventName === 'INSERT'` and `primaryKey === 'Virus'`

**Bonus 2: Create a fully real time application**

- If you open a second frontend in another windows, you will see the viruses appear in real time,
but if you destroy a virus it will not disappear in the other windows. Make it happens!

***Pro tips***:

- *If you want to deploy only one function, use `serverless deploy -f <your-function-name>`. It is much faster (~10s) than deploying a stack (~30s) but will only deploy the function's code, not any config change in your `serverless.ts`.*
- *To call locally one function, use `serverless invoke -f <your-function-name> --path path/to/mocked-event.json`*

Done ? Nice work ! Don't forget to kill your stack by running `serverless remove` in the backend folder !

Have you killed your stack ? You just have created an app which trigger a lambda every minute! Don't forget it or it could be expensive ;)   

To see final result, checkout the start of [session 4](./session-4.md).
