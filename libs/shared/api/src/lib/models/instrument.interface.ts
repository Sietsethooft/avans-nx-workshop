import { Id } from './id.type';

export interface IInstrument {
  _id: Id;
  name: string;
  type: string;
  imageURL?: string;
}

export type ICreateInstrument = Pick<IInstrument, 'name' | 'type' | 'imageURL' | '_id'>;
export type IUpdateInstrument = Partial<Omit<IInstrument, '_id'>>;
export type IUpsertInstrument = IInstrument;