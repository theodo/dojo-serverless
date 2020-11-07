export interface Item {
  partitionKey: 'Virus' | 'Connection';
  sortKey: string;
  [key: string]: string;
}
