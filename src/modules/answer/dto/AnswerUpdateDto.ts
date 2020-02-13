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

export class AnswerUpdateDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiModelProperty()
    text: string;

    @IsBoolean()
    @IsOptional()
    @ApiModelProperty({ required: false, type: Boolean })
    iscorrect: boolean;
}
export class AnswerUpdateParamsDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @ApiModelProperty({})
    id: string;
}
