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
import { RoleTypeRigester } from '../../../common/constants/role-type-register';

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

    @ApiModelProperty({
        enum: Object.keys(RoleTypeRigester),
        default: 'User',
        description: 'user role',
    })
    @IsOptional()
    role: string = 'User';

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
