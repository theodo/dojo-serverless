export enum VIRUS_STATUS {
  ALIVE = 'alive',
  DEAD = 'dead',
}

export interface Virus {
  id: string;
  status: VIRUS_STATUS;
}
