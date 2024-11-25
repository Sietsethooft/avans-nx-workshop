import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsArray, IsDate } from 'class-validator';
import {
    // ICreateUser,
    IUpdateUser,
    IUpsertUser,
    IUserRegistration,
    Id,
    UserGender,
    UserRole
} from '@avans-nx-workshop/shared/api';
import { Instrument } from '@avans-nx-workshop/instrument';

export class CreateUserDto implements IUserRegistration {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;
}

export class UpsertUserDto implements IUpsertUser {
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    emailAddress!: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive!: boolean;

    @IsString()
    @IsNotEmpty()
    profileImgUrl = '';

    @IsString()
    @IsNotEmpty()
    role: UserRole = UserRole.Unknown;

    @IsString()
    @IsNotEmpty()
    gender: UserGender = UserGender.Unknown;

    @IsArray()
    @IsNotEmpty()
    instruments: Instrument[] = [];

    @IsDate()
    @IsNotEmpty()
    birthDate!: Date;
}

export class UpdateUserDto implements IUpdateUser {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    name!: string;
}
