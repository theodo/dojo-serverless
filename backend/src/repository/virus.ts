import { VirusProps } from 'model/Virus';

import { DynamoDB } from 'aws-sdk';
import { VIRUS_TABLE } from 'config/tables';
import uuid from 'uuid';

const documentClient = new DynamoDB.DocumentClient();

export const createVirus = async (
  virusProps: VirusProps,
): Promise<VirusProps> => {
  const virusId = uuid();

  await documentClient
    .put({
      TableName: VIRUS_TABLE,
      Item: { ...virusProps, id: virusId },
    })
    .promise();

  return virusProps;
};
