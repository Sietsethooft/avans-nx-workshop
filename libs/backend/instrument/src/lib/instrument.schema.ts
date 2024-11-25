import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Instrument {
  @Prop({ required: true })
  @IsString()
  name!: string;

  @Prop({ required: true })
  @IsString()
  type!: string;

  @Prop()
  @IsString()
  imageURL?: string;
}

export type InstrumentDocument = Instrument & Document;
export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
