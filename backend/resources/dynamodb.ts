import { VIRUS_TABLE } from '../src/config/tables';

export default {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: VIRUS_TABLE,
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    BillingMode: 'PAY_PER_REQUEST',
  },
};
