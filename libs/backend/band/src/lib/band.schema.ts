import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Instrument, InstrumentSchema } from '../../../instrument/src';
import { IsString, IsMongoId, IsEnum, IsNumber } from 'class-validator';

@Schema()
export class Band {
  @IsMongoId()
  _id!: String;

  @Prop({ required: true })
  @IsString()
  name!: string;

  @Prop()
  @IsString()
  description?: string;

  @Prop({
    required: false,
    select: true,
    default: 'https://utaten.com/karaoke/wp-content/uploads/2018/09/image2-21.jpg'
  })
  profileImgUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @IsMongoId()
  leader!: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  @IsMongoId({ each: true })
  members!: Types.ObjectId[];

  @Prop({ type: [InstrumentSchema], default: [] }) // Embedded schema
  searchFor?: Instrument[];

  @Prop()
  @IsEnum(['Wekelijks', 'Maandelijks', 'Per kwartaal'])
  frequencyRepetition?: 'Wekelijks' | 'Maandelijks' | 'Per kwartaal';

  @Prop()
  @IsString()
  region?: string;

  @Prop({ type: [String], default: [] })
  genres!: string[];

  @Prop()
  @IsNumber()
  minAge?: number;

  @Prop()
  @IsNumber()
  minExperience?: number;
}

export type BandDocument = Band & Document;
export const BandSchema = SchemaFactory.createForClass(Band);