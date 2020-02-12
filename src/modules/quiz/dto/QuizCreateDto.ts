'use strict';

import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class QuizCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    title: string;
}
