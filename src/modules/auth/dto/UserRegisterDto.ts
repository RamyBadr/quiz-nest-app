'use strict';

import {
    IsString,
    IsEmail,
    MinLength,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
    IsIn,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @IsIn(['User', 'Teacher'])
    @IsNotEmpty()
    @ApiModelProperty({})
    role: string;

    @IsString()
    @MinLength(6)
    @ApiModelProperty({ minLength: 6 })
    readonly password: string;

    @Column()
    @IsPhoneNumber('EG')
    @IsOptional()
    @ApiModelProperty()
    phone: string;
}
