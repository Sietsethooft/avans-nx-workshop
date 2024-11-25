import { Id } from './id.type';

export interface IInstrument {
    id: Id;
    name: string;
    type: string;
}

export type ICreateInstrument = Pick<IInstrument, 'name' | 'type'>;
export type IUpdateInstrument = Partial<Omit<IInstrument, 'id'>>;
export type IUpsertInstrument = IInstrument;