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

export class UserFilterDto {
    @IsString()
    @IsIn(['User', 'Teacher'])
    @IsNotEmpty()
    @ApiModelProperty({})
    role: string;
}
