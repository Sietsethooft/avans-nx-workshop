import { Id } from './id.type';
import { IUserIdentity } from './user.interface';
import { IInstrument } from './instrument.interface';

export enum FrequencyRepetition {
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Quarterly = 'Quarterly'
}

export interface IBand {
    id: Id;
    name: string;
    description?: string;
    leader: IUserIdentity;
    members: IUserIdentity[];
    searchFor: IInstrument[];
    frequencyRepetition?: FrequencyRepetition;
    region?: string;
    genres: string[];
    minAge?: number;
    minExperience?: number;
}

export type ICreateBand = Pick<IBand, 'name' | 'description' | 'leader' | 'members' | 'searchFor' | 'frequencyRepetition' | 'region' | 'genres' | 'minAge' | 'minExperience'>;
export type IUpdateBand = Partial<Omit<IBand, 'id'>>;
export type IUpsertBand = IBand;