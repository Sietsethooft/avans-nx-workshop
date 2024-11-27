import { IsString, IsMongoId, IsEnum, IsNumber, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Instrument } from '../../../instrument/src';
import { Id } from '@avans-nx-workshop/shared/api';

export class CreateBandDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  profileImgUrl? = '';

  @IsMongoId()
  @IsNotEmpty()
  leader!: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  members!: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  searchFor?: Instrument[];

  @IsEnum(['Wekelijks', 'Maandelijks', 'Per kwartaal'])
  @IsOptional()
  frequencyRepetition?: 'Wekelijks' | 'Maandelijks' | 'Per kwartaal';

  @IsString()
  @IsOptional()
  region?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  genres!: string[];

  @IsNumber()
  @IsOptional()
  minAge?: number;

  @IsNumber()
  @IsOptional()
  minExperience?: number;
}

export class UpsertBandDto {
  _id!: Id;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  profileImgUrl? = '';

  @IsMongoId()
  @IsNotEmpty()
  leader!: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  members!: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  searchFor?: Instrument[];

  @IsEnum(['Wekelijks', 'Maandelijks', 'Per kwartaal'])
  @IsOptional()
  frequencyRepetition?: 'Wekelijks' | 'Maandelijks' | 'Per kwartaal';

  @IsString()
  @IsOptional()
  region?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  genres!: string[];

  @IsNumber()
  @IsOptional()
  minAge?: number;

  @IsNumber()
  @IsOptional()
  minExperience?: number;
}

export class UpdateBandDto {
  _id?: string | undefined;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
  
  @IsString()
  @IsOptional()
  profileImgUrl? = '';

  @IsMongoId()
  @IsOptional()
  leader?: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  members?: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  searchFor?: Instrument[];

  @IsEnum(['Wekelijks', 'Maandelijks', 'Per kwartaal'])
  @IsOptional()
  frequencyRepetition?: 'Wekelijks' | 'Maandelijks' | 'Per kwartaal';

  @IsString()
  @IsOptional()
  region?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genres?: string[];

  @IsNumber()
  @IsOptional()
  minAge?: number;

  @IsNumber()
  @IsOptional()
  minExperience?: number;
}