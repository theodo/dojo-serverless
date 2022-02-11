import { Stack } from '@aws-cdk/core';
import { stack, table } from '@resources/index';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      stream: {
        // @ts-ignore
        type: 'dynamodb',
        // @ts-ignore
        arn: Stack.of(stack).resolve(table.tableStreamArn),
      },
    },
  ],
}