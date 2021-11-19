// import { Table, AttributeType, StreamViewType, BillingMode } from '@aws-cdk/aws-dynamodb';
// import { Construct } from '@aws-cdk/core';

// export default (stack: Construct) => {
//   return new Table(stack, 'DojoServerlessTable', {
//     tableName: "dojo-serverless-table",
//     billingMode: BillingMode.PAY_PER_REQUEST,
//     stream: StreamViewType.NEW_AND_OLD_IMAGES,
//     partitionKey: { name: 'partitionKey', type: AttributeType.STRING },
//     sortKey: { name: 'sortKey', type: AttributeType.STRING },
//   });
// }