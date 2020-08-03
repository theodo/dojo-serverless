import EventBridge from 'aws-sdk/clients/eventbridge';

const eventBridge = new EventBridge();

export const main = async () => {
  await eventBridge
    .putEvents({
      Entries: [
        {
          Source: 'dojo-serverless',
          DetailType: 'VIRUS_CREATION_REQUESTED',
          Detail: JSON.stringify({}),
          EventBusName: 'dojo-serverless',
        },
        {
          Source: 'dojo-serverless',
          DetailType: 'VIRUS_CREATION_REQUESTED',
          Detail: JSON.stringify({}),
          EventBusName: 'dojo-serverless',
        },
        {
          Source: 'dojo-serverless',
          DetailType: 'VIRUS_CREATION_REQUESTED',
          Detail: JSON.stringify({}),
          EventBusName: 'dojo-serverless',
        },
      ],
    })
    .promise();
};
