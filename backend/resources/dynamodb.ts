export default {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'dojo-serverless-table',
    AttributeDefinitions: [
      { AttributeName: 'partitionKey', AttributeType: 'S' },
      { AttributeName: 'sortKey', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'partitionKey', KeyType: 'HASH' },
      { AttributeName: 'sortKey', KeyType: 'RANGE' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    StreamSpecification: {
      StreamViewType: 'NEW_AND_OLD_IMAGES',
    },
  },
};
