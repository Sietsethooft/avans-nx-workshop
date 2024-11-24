import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsEnum, IsMongoId } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema()
export class Request {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @IsMongoId()
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Band', required: true })
  @IsMongoId()
  bandId!: Types.ObjectId;

  @Prop({ enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  @IsEnum(['pending', 'accepted', 'rejected'])
  status!: 'pending' | 'accepted' | 'rejected';

  @Prop({ default: Date.now })
  @IsDate()
  date!: Date;
}

export type RequestDocument = Request & Document;
export const RequestSchema = SchemaFactory.createForClass(Request);
