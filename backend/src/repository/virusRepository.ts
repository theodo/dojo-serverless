import { VirusProps } from 'model/VirusModel';

import { DynamoDB } from 'aws-sdk';
import { VIRUS_TABLE } from 'config/tables';
import uuid from 'uuid';

const documentClient = new DynamoDB.DocumentClient();

export const fetchViruses = async (): Promise<Array<VirusProps>> => {
  const { Items = [] } = await documentClient
    .scan({
      TableName: VIRUS_TABLE,
    })
    .promise();

  return Items as VirusProps[];
};

export const createVirus = async (
  virusProps: VirusProps,
): Promise<VirusProps> => {
  const newVirus = { ...virusProps, id: uuid() };

  await documentClient
    .put({
      TableName: VIRUS_TABLE,
      Item: {
        ...newVirus,
        partitionKey: 'Virus',
        sortKey: newVirus.id,
      },
    })
    .promise();

  return virusProps;
};

export const deleteVirus = async (id: string): Promise<string> => {
  try {
    await documentClient
      .delete({
        TableName: VIRUS_TABLE,
        Key: { partitionKey: 'Virus', sortKey: id },
      })
      .promise();
  } catch (error) {
    console.error(`Failed to delete item with error ${error}`);
  }

  return id;
};
