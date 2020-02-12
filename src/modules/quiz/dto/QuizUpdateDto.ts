'use strict';

import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsBooleanString,
    IsOptional,
    IsUUID,
} from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class QuizUpdateDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiModelProperty()
    title: string;

    @IsBoolean()
    @IsOptional()
    @ApiModelProperty({ required: false, type: Boolean })
    ispublished: boolean;
}
export class QuizIdParamsDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @ApiModelProperty({})
    id: string;
}
