## Session 4: Randomize the generation of viruses with Step Functions

For the moment, we scheduled the creation of one virus every minute. It is slow, but the `rate` and `cron` scheduling expressions does not allow shorter frequencies! And even if it did, it would be nice to have some randomization...

We can do that thanks to EventBridge and Step Functions! Our goal is the make the scheduled lambda send 3 EventBridge messages every minute. Each message will launch a Step Function that will wait a random amount of time between 0 and 60s before creating a virus.

### Deploy your first Event Bus and Step Function

Checkout session-4 branch

```bash
git checkout session-4-v2
```

- Notice the new `event-bridge.ts` in the ressource folder
- Add it to the ressources in the `serverless.ts` (end of file)
- Give your lambdas the right to dispatch messages on this event bus by uncommenting the correct blocks in the `provider` section of the `serverless.ts`.
- Run yarn and deploy your stack.

```bash
cd backend
yarn
sls deploy
```

- Open [AWS EventBridge](https://eu-west-1.console.aws.amazon.com/events/home#/eventbuses) to check out your custom event bus.
- Open [AWS StepFunctions](https://eu-west-1.console.aws.amazon.com/states/home) to check the newly created state machine that does nothing (for the moment)

### Now, it's your turn 💪

- Replace the `requestNothing` lambda by a `spreadVirus` lambda that sends 3 events of type `VIRUS_CREATION_REQUESTED` in the `dojo-serverless` Event Bus
- Rename the `doNothing` Step Function to have 3 steps:
  - A `ChooseWaitTime` state of [`Task` type](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-task-state.html), which triggers a lambda returning a number of seconds to wait (random between 1 and 60)
  - A `WaitXSeconds` state of [`Wait` type](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-wait-state.html), that waits for the given number of seconds before triggering the next step (use the `SecondsPath` property)
  - A final `CreateVirus` state of `Task` type that calls the `createVirus` lambda

Done ? Nice work ! Don't forget to kill your stack by running `serverless remove` in the backend folder ! You just have created an app which trigger a lambda every minute! Don't forget it or it could be expensive ;)

To see final result, checkout master branch!
