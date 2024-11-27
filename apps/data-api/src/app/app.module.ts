import { Module } from '@nestjs/common';
// import { BackendFeaturesMealModule } from '@avans-nx-workshop/backend/features';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Logger } from '@nestjs/common';
import { BandModule } from '@avans-nx-workshop/band';
import { InstrumentModule } from '@avans-nx-workshop/instrument';

@Module({
    imports: [
        BandModule,
        InstrumentModule,
        AuthModule,
        MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                connection.on('connected', () => {
                    // console.log('is connected');
                    Logger.verbose(
                        `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`,
                        'Appmodule'
                    );
                });
                connection._events.connected();
                return connection;
            }
        }),
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
