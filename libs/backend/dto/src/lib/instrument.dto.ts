import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { Id } from '@avans-nx-workshop/shared/api';

export class CreateInstrumentDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsOptional()
  imageURL?: string;
}

export class UpsertInstrumentDto {
  @IsMongoId()
  @IsNotEmpty()
  _id!: Id;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsOptional()
  imageURL?: string;
}

export class UpdateInstrumentDto {
  @IsMongoId()
  @IsOptional()
  _id?: Id;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  imageURL?: string;
}