export type ISODateString = string;
export type UUID = string;

export interface AuditedEntity {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export * from './domain';
