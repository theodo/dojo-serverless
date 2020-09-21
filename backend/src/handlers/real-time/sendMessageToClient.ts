// @ts-nocheck
import { DynamoDBStreamEvent } from 'aws-lambda';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { getAllConnections } from '@libs/connections';
import { sendMessageToConnection } from '@libs/websocket';
import { Item } from '@libs/types';
import { Virus } from '../virus/types';

const sendMessageToEachConnection = async (message: any): Promise<void> => {
    // TODO use sendMessageToConnection for each connection
};

const isVirus = (item: Item): item is Virus => item.partitionKey === 'Virus';

export const main = async (event: DynamoDBStreamEvent): Promise<void> => {
    // TODO for each record, if it's an insertion of virus, sendMessageToEachConnection
};
