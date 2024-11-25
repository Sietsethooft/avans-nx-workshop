import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://jamwiththeband.azurewebsites.net',
    dataApiUrl: 'https://jamwiththeband.azurewebsites.net/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb://remote-host/mongodb'
};
