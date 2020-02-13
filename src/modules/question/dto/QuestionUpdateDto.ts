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

export class QuestionUpdateDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiModelProperty()
    text: string;

    @IsBoolean()
    @IsOptional()
    @ApiModelProperty({ required: false, type: Boolean })
    ispublished: boolean;
}
export class QuestionUpdateParamsDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @ApiModelProperty({})
    id: string;
}
