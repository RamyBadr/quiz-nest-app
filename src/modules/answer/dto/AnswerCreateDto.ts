'use strict';

import { IsString, IsNotEmpty, IsBoolean, IsUUID } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { QuestionDto } from '../../question/dto/QuestionDto';
import { QuestionEntity } from '../../question/question.entity';

export class AnswerCreateDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiModelProperty()
    questionId: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiModelProperty({ default: false })
    iscorrect: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    text: string;
}
