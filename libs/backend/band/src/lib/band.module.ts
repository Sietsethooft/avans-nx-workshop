import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BandSchema } from './band.schema';
import { InstrumentSchema } from '../../../instrument/src';
import { BandController } from './band.controller';
import { BandService } from './band.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Band', schema: BandSchema },
      { name: 'Instrument', schema: InstrumentSchema },
    ]),
  ],
  controllers: [BandController],
  providers: [BandService],
  exports: [BandService],
})
export class BandModule {}